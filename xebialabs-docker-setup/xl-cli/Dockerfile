FROM alpine:3.7

RUN apk add --no-cache curl

RUN curl --fail-early -o /usr/local/bin/xl https://s3.amazonaws.com/xl-cli/bin/9.5.1/linux-amd64/xl && \
    chmod +x /usr/local/bin/xl

RUN curl --fail-early -o /usr/local/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/master/wait-for && \
    chmod +x /usr/local/bin/wait-for

USER root
VOLUME "/data"

ENTRYPOINT ["/usr/local/bin/wait-for", "-t", "120", "xl-deploy:4516", "--", "/usr/local/bin/wait-for", "-t", "120", "xl-release:5516", "--", "/usr/local/bin/xl"]
