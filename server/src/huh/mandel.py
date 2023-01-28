# generate infinite mandelbrot set
# visualize mandelbrot set with matplotlib animation module and save to gif file with imagemagick writer

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cm as cm
import matplotlib.animation as animation

def mandelbrot( h,w, maxit=20 ):
    """Returns an image of the Mandelbrot fractal of size (h,w)."""
    y,x = np.ogrid[ -1.4:1.4:h*1j, -2:0.8:w*1j ]
    c = x+y*1j
    # generate infinite mandelbrot set
    img = np.zeros( c.shape, dtype=int )
    z = c
    for i in range(maxit):
        z  = z**2 + c
        diverge = z*np.conj(z) > 2**2            # who is diverging
        img[diverge] = i                         # colorize
        z[diverge] = 2                           # avoid diverging too much
    return img

def updatefig(*args):
    global p
    for i in range(10):
        p = mandelbrot(400,400)
    im.set_array(p)
    return im,  # note the comma

p = mandelbrot(400,400)
fig = plt.figure()
im = plt.imshow(p, cmap=cm.hot)
ani = animation.FuncAnimation(fig, updatefig, interval=50, blit=True)
plt.show()

ani.save('mandelbrot.gif', fps=30, writer='imagemagick')

# ## Path: server/src/huh/mandelbrot.py