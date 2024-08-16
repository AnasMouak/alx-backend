#!/usr/bin/env python3


def index_range(page, page_size):
    if page < 1 or page_size < 1:
        return []

    start = (page - 1) * page_size
    end = start + page_size

    return (start, end)
