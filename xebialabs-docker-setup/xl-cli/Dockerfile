FROM alpine:3.7

RUN apk add --no-cache curl

RUN curl --silent --fail-early -o /usr/local/bin/xl https://s3.amazonaws.com/xl-cli/bin/9.5.2/linux-amd64/xl && \
    chmod +x /usr/local/bin/xl

RUN curl --silent --fail-early -o /usr/local/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/master/wait-for && \
    chmod +x /usr/local/bin/wait-for

RUN mkdir /.xebialabs && chown 10001:10001 /.xebialabs

USER 10001
VOLUME "/data"

ENTRYPOINT ["/usr/local/bin/wait-for", "-t", "600", "xl-release:5516", "--", "/usr/local/bin/xl"]
