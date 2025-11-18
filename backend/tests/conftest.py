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
pytest_plugins = ["pytest_asyncio"]

# asyncio mode for pytest-asyncio
asyncio_mode = "auto"

