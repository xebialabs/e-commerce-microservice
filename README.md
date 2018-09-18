# A microservice e-commerce application demo

There is a version of this app with Consul as registry instead of JHipster Registry in the [consul branch](https://github.com/xebialabs/e-commerce-microservice/tree/consul)

The stack is based on JHipster microservice architecture. Below are the componenets

[![Architecture][arch-image]]

## Store app:

This is the Gateway to the mircoservices. Refer [this](https://github.com/xebialabs/e-commerce-microservice/store/README.md)

## Invoice app:

This is one of the mircoservices. Refer [this](https://github.com/xebialabs/e-commerce-microservice/invoice/README.md)

## Notification app:

This is one of the mircoservices. Refer [this](https://github.com/xebialabs/e-commerce-microservice/notification/README.md)


## Docker compose files:

The complete docker compose setup for the stack. Refer [this](https://github.com/xebialabs/e-commerce-microservice/docker-compose/README-DOCKER-COMPOSE.md)

## Kubernetes files:

The complete Kubernetes setup for the stack. Refer [this](https://github.com/xebialabs/e-commerce-microservice/xl-platform/kubernetes/README.md)

## Xl Platform files:

The complete XL-Platform setup for the stack. Refer [this](https://github.com/xebialabs/e-commerce-microservice/xl-platform/)


[arch-image]: https://raw.githubusercontent.com/xebialabs/e-commerce-microservice/master/arch.png
