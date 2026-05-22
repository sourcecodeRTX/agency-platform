#!/usr/bin/env python3
import shutil

source = r'c:\Users\mrrat\Pictures\agency-platform\lib\editors-config-v2.ts'
dest = r'c:\Users\mrrat\Pictures\agency-platform\lib\editors-config.ts'

try:
    shutil.copy2(source, dest)
    print(f"Successfully copied {source} to {dest}")
except Exception as e:
    print(f"Error: {e}")
