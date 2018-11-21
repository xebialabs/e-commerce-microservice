# A microservice e-commerce application demo

There is a version of this app with Consul as registry instead of JHipster Registry in the [consul branch](https://github.com/xebialabs/e-commerce-microservice/tree/consul)

The stack is based on JHipster microservice architecture. Below are the componenets

![Architecture][arch-image]

## Store app:

This is the Gateway to the microservices. Refer [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/store/README.md)

## Invoice app:

This is one of the microservices. Refer [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/invoice/README.md)

## Notification app:

This is one of the microservices. Refer [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/notification/README.md)

## Docker compose files:

The complete docker compose setup for the stack. Refer [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/docker-compose/README-DOCKER-COMPOSE.md)

## Xl Platform Blueprint files:

To deploy this blueprint with XL Platform follow the below steps

1. Generate the blueprint using `xl blueprint` or use the already generated yaml files in this repository
2. Apply the generated yaml configurations

    ```
    xl apply -f xebialabs.yaml
    ```

3. Go to XL Release and look for the `e-commerce / e-commerce-ci-cd` tamplate and start a new release from it.

[arch-image]: https://raw.githubusercontent.com/xebialabs/e-commerce-microservice/master/arch.png
