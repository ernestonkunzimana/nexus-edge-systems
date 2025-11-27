import os
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import random
from .api.v1 import router as v1_router

# Optional observability/security integrations
try:
    import sentry_sdk
except Exception:
    sentry_sdk = None

try:
    from opentelemetry import trace
    from opentelemetry.sdk.resources import Resource
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
    from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
except Exception:
    trace = None

try:
    from prometheus_fastapi_instrumentator import Instrumentator
except Exception:
    Instrumentator = None


app = FastAPI(title="Nexus Edge Systems API")
app.include_router(v1_router)

# Initialize Sentry if provided via env
SENTRY_DSN = os.getenv("SENTRY_DSN")
if sentry_sdk and SENTRY_DSN:
    sentry_sdk.init(dsn=SENTRY_DSN, traces_sample_rate=0.1)

# Initialize OpenTelemetry basic console exporter (optional)
# Console exporter is opt-in via `ENABLE_OTEL_CONSOLE=1` to avoid
# exporter I/O issues during test shutdown; also skip when running pytest.
if trace and os.getenv("ENABLE_OTEL_CONSOLE", "0") == "1" and not os.getenv("PYTEST_CURRENT_TEST"):
    resource = Resource.create({"service.name": "nexus-backend"})
    provider = TracerProvider(resource=resource)
    provider.add_span_processor(BatchSpanProcessor(ConsoleSpanExporter()))
    trace.set_tracer_provider(provider)
    # instrument FastAPI app (best-effort)
    try:
        FastAPIInstrumentor.instrument_app(app)
    except Exception:
        pass

# Prometheus metrics endpoint (best-effort)
if Instrumentator:
    try:
        instrumentator = Instrumentator()
        instrumentator.instrument(app).expose(app, endpoint="/metrics")
    except Exception:
        pass


class MetricPoint(BaseModel):
    time: str
    value: float


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/v1/metrics", response_model=List[MetricPoint])
async def metrics():
    data = []
    for i in range(12):
        data.append(MetricPoint(time=f"{i}:00", value=round(20 + random.random() * 80, 2)))
    return data
