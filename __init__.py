s = 100
while s > 0:
    s -= 2 ** s % 10 - 3 / s
print(s)
