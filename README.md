# A microservice e-commerce application demo

There is a version of this app with Consul as registry instead of JHipster Registry in the [consul branch](https://github.com/xebialabs/e-commerce-microservice/tree/consul).

The stack is based on JHipster microservice architecture. Below are the components.

![Architecture][arch-image]

## Store app

This is the Gateway to the microservices. Refer to [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/store/README.md).

## Invoice app

This is one of the microservices. Refer to [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/invoice/README.md).

## Notification app

This is one of the microservices. Refer to [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/notification/README.md).

## Docker Compose files

The complete Docker Compose setup for the stack. Refer to [this](https://github.com/xebialabs/e-commerce-microservice/blob/master/docker-compose/README-DOCKER-COMPOSE.md).

## XebiaLabs DevOps Platform blueprint files

To deploy this blueprint with the XebiaLabs DevOps Platform, follow these steps:

1. Generate the blueprint using `xl blueprint` or use the already generated YAML files in this repository.
2. Apply the generated YAML configurations:

    ```
    xl apply -f xebialabs.yaml
    ```

3. Go to XL Release, look for the `e-commerce / e-commerce-ci-cd` template, and start a new release from it.

[arch-image]: https://raw.githubusercontent.com/xebialabs/e-commerce-microservice/master/arch.png
