FROM xebialabsunsupported/xl-deploy:8.5.0

COPY default-conf/* /opt/xebialabs/xl-deploy-server/default-conf/

# workarounds to get Terraform working
COPY terraform/terraform /bin/terraform
COPY lib/provision-8.6.0-SNAPSHOT.jar /opt/xebialabs/xl-deploy-server/lib/provision-8.5.0.jar
COPY lib/xld-terraform-plugin-8.0.1-SNAPSHOT.xldp /opt/xebialabs/xl-deploy-server/plugins/xld-terraform-plugin-8.0.1.xldp

USER root

RUN chmod +x /bin/terraform