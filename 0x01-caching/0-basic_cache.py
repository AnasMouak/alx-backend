#!/usr/bin/python3
"""Basic dictionary"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Basic caching system with no limit."""

    def put(self, key, item):
        """Add an item to the cache using the given key."""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """Get an item from the cache by its key."""
        return self.cache_data.get(key, None)
