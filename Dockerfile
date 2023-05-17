# BUILD FOR LOCAL DEVELOPMENT

FROM node:18-alpine As development

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

USER node

# BUILD FOR PRODUCTION

FROM node:18-alpine As build

WORKDIR /app

COPY package.json yarn.lock ./

COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN yarn run build

ENV NODE_ENV production

RUN yarn install --production=true

USER node

# PRODUCTION

FROM node:18-alpine As production

ARG APP_PORT

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

EXPOSE $APP_PORT

