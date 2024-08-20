#!/usr/bin/python3
"""LFU caching"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """LFU caching system."""

    def __init__(self):
        """Initialize the class."""
        super().__init__()
        self.frequency = {}
        self.usage_order = {}
        self.time = 0

    def put(self, key, item):
        """Add an item to the cache using the LFU algorithm."""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.frequency[key] += 1
            self.usage_order[key] = self.time
            self.time += 1
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                min_freq = min(self.frequency.values())
                least_freq_keys = [k for k in self.frequency if self.frequency[k] == min_freq]

                if len(least_freq_keys) > 1:
                    lru_key = min(least_freq_keys, key=lambda k: self.usage_order[k])
                else:
                    lru_key = least_freq_keys[0]

                del self.cache_data[lru_key]
                del self.frequency[lru_key]
                del self.usage_order[lru_key]
                print(f"DISCARD: {lru_key}")

            self.cache_data[key] = item
            self.frequency[key] = 1
            self.usage_order[key] = self.time
            self.time += 1

    def get(self, key):
        """Get an item from the cache by its key."""
        if key is None or key not in self.cache_data:
            return None

        self.frequency[key] += 1
        self.usage_order[key] = self.time
        self.time += 1

        return self.cache_data[key]
