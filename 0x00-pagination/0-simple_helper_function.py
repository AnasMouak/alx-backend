#!/usr/bin/env python3
"""Pagination helper function."""


def index_range(page, page_size):
    """
    Return a tuple of the start and end index corresponding to the range
    of indexes to return in a list for the given pagination parameters.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        tuple: A tuple containing the start index and end index.
    """
    if page < 1 or page_size < 1:
        return []

    start = (page - 1) * page_size
    end = start + page_size

    return (start, end)
