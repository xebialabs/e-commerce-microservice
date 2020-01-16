FROM xebialabs/xl-deploy:9.5

COPY default-conf/* /opt/xebialabs/xl-deploy-server/default-conf/

# install Terraform
ENV TERRAFORM_VERSION=0.12.19

USER root

RUN curl --fail-early -o /tmp/terraform.zip https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    echo y | unzip /tmp/terraform.zip -d /usr/local/bin

RUN rm -f /tmp/terraform.zip
