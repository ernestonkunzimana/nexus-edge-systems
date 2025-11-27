"""
Pytest configuration and fixtures for backend tests.
"""
import sys
import os
from pathlib import Path

# Add the backend app directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# pytest configuration
# Note: avoid defining `pytest_plugins` here when running tests from a
# parent folder, which triggers a pytest deprecation/error. The pytest-asyncio
# plugin is usually auto-discovered when installed. We keep `asyncio_mode`
# to guide pytest-asyncio behavior when present.
asyncio_mode = "auto"

