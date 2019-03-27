FROM xebialabs/xl-deploy:8.6.1

COPY default-conf/* /opt/xebialabs/xl-deploy-server/default-conf/

# install Terraform
ENV TERRAFORM_VERSION=0.11.13

USER root

RUN curl --fail-early -o /tmp/terraform.zip https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    unzip /tmp/terraform.zip -d /usr/local/bin && \
    rm -f /tmp/terraform.zip