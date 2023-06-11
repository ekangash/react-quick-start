#####################################
###                               ###
###            NODE               ###
###                               ###
#####################################
FROM node:16.8.0

# set working directory
WORKDIR /var/www/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /var/www/app/node_modules/.bin:$PATH

# switch to non-root user
USER 1000:1000

# start app
CMD ["sleep", "infinity"]