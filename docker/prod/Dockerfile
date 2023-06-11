#####################################
###                               ###
###           NGINX               ###
###                               ###
#####################################
FROM node:16.8.0 AS builder

WORKDIR /var/www/prod

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./

RUN npm install
RUN npm run prod

#RUN mkdir /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

FROM nginx AS runner

WORKDIR /var/www/prod

COPY --from=builder --chown=1000:1000 /var/www/prod/dist ./dist
COPY --from=builder /var/www/prod/node_modules ./node_modules
COPY --from=builder /var/www/prod/package.json ./package.json

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]