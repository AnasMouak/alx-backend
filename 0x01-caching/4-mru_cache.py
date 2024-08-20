#!/usr/bin/python3
"""MRU caching"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRU caching system."""
    def __init__(self):
        """Initialize the class."""
        super().__init__()
        self.order = []

    def put(self, key, item):
        """Add an item to the cache using the MRU algorithm."""
        if key is not None and item is not None:
            if key in self.cache_data:
                self.order.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                most_recently_used = self.order.pop()
                del self.cache_data[most_recently_used]
                print(f"DISCARD: {most_recently_used}")

            self.cache_data[key] = item
            self.order.append(key)

    def get(self, key):
        """Get an item from the cache by its key."""
        if key is not None and key in self.cache_data:
            self.order.remove(key)
            self.order.append(key)
            return self.cache_data[key]
        return None
