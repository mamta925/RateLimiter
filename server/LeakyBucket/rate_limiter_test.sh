#!/bin/bash

# Simulate fast requests
for i in {1..15}; do
  curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
done
