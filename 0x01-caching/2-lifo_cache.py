#!/usr/bin/python3
"""LIFO caching"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """LIFO caching system."""
    def __init__(self):
        """Initialize the class."""
        super().__init__()
        self.last_key = None

    def put(self, key, item):
        """Add an item to the cache using the LIFO algorithm."""
        if key is not None and item is not None:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                if self.last_key is not None:
                    del self.cache_data[self.last_key]
                    print(f"DISCARD: {self.last_key}")
            self.last_key = key

    def get(self, key):
        """Get an item from the cache by its key."""
        return self.cache_data.get(key, None)
