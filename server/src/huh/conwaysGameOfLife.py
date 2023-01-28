# conways game of life

import random
import time
import os
import sys
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

ON = 255
OFF = 0
vals = [ON, OFF]

def randomGrid(N):
    """returns a grid of NxN random values"""
    return np.random.choice(vals, N*N, p=[0.2, 0.8]).reshape(N, N)

def addGlider(i, j, grid):
    """adds a glider with top left cell at (i, j)"""
    glider = np.array([[0, 0, 255],
                       [255, 0, 255],
                       [0, 255, 255]])
    grid[i:i+3, j:j+3] = glider

def addGosperGliderGun(i, j, grid):
    """adds a Gosper Glider Gun with top left
    cell at (i, j)"""
    gun = np.zeros(11*38).reshape(11, 38)

    gun[5][1] = gun[5][2] = 255
    gun[6][1] = gun[6][2] = 255

    gun[3][13] = gun[3][14] = 255
    gun[4][12] = gun[4][16] = 255
    gun[5][11] = gun[5][17] = 255
    gun[6][11] = gun[6][15] = gun[6][17] = gun[6][18] = 255
    gun[7][11] = gun[7][17] = 255
    gun[8][12] = gun[8][16] = 255
    gun[9][13] = gun[9][14] = 255

    gun[1][25] = 255
    gun[2][23] = gun[2][25] = 255
    gun[3][21] = gun[3][22] = 255
    gun[4][21] = gun[4][22] = 255
    gun[5][21] = gun[5][22] = 255
    gun[6][23] = gun[6][25] = 255
    gun[7][25] = 255

    gun[3][35] = gun[3][36] = 255
    gun[4][35] = gun[4][36] = 255

    grid[i:i+11, j:j+38] = gun

def update(frameNum, img, grid, N):
    # copy grid since we require 8 neighbors
    # for calculation and we go line by line
    newGrid = grid.copy()
    for i in range(N):
        for j in range(N):
            # compute 8-neghbor sum
            # using toroidal boundary conditions - x and y wrap around
            # so that the simulaton takes place on a toroidal surface.
            total = (grid[i, (j-1)%N] + grid[i, (j+1)%N] +
                     grid[(i-1)%N, j] + grid[(i+1)%N, j] +
                     grid[(i-1)%N, (j-1)%N] + grid[(i-1)%N, (j+1)%N] +
                     grid[(i+1)%N, (j-1)%N] + grid[(i+1)%N, (j+1)%N])
            # apply Conway's rules
            if grid[i, j]  == ON:
                if (total < 2) or (total > 3):
                    newGrid[i, j] = OFF
            else:
                if total == 3:
                    newGrid[i, j] = ON
    # update data
    img.set_data(newGrid)
    grid[:] = newGrid[:]
    return img, grid

def main():
    # set grid size
    N = 100
    # set animation update interval
    updateInterval = 50
    # declare grid
    grid = np.array([])
    # check if command line arguments were passed
    if len(sys.argv) < 2:
        # populate grid with random on/off - more off than on
        grid = randomGrid(N)
    else:
        # populate grid with a Gosper Glider Gun
        grid = np.zeros(N*N).reshape(N, N)
        addGosperGliderGun(10, 10, grid)

    # set up animation
    fig, ax = plt.subplots()
    img = ax.imshow(grid, interpolation='nearest')
    ani = animation.FuncAnimation(fig, update, fargs=(img, grid, N, ),
                                  frames = 10,
                                  interval=updateInterval,
                                  save_count=50)

    # # of frames?
    # set output file
    # ani.save('game_of_life.gif', fps=30, writer='imagemagick')
    plt.show()

if __name__ == '__main__':
    main()

## Path: server/mandelbrot.py
## mandelbrot set
#
#import numpy as np
#import matplotlib.pyplot as plt
#import matplotlib.cm as cm
#import matplotlib.animation as animation
#
#def mandelbrot( h,w, maxit=20 ):
#    """Returns an image of the Mandelbrot fractal of size (h,w)."""
#    y,x = np.ogrid[ -1.4:1.4:h*1j, -2:0.8:w*1j ]
#    c = x+y*1j
#    z = c
#    divtime = maxit + np.zeros(z.shape, dtype=int)
#
#    for i in range(maxit):
#        z  = z**2 + c
#        diverge = z*np.conj(z) > 2**2            # who is diverging
#        div_now = diverge & (divtime==maxit)  # who is diverging now
#        divtime[div_now] = i                  # note when
#        z[diverge] = 2                        # avoid diverging too much
#
#    return divtime
#
#def updatefig(*args):
#    global p
#    for i in range(10):
#        p = mandelbrot(400,400)
#    im.set_array(p)
#    return im,
#
#fig = plt.figure()
#im = plt.imshow(p, cmap=cm.hot)
#ani = animation.FuncAnimation(fig, updatefig, interval=50, blit=True)
#plt.show()
#
#p = mandelbrot(400,400)
#im = plt.imshow(p, cmap=cm.hot)
