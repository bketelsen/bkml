FROM ubuntu:20.04
COPY ./data /data
COPY --from=ghcr.io/cueblox/blox /blox /usr/bin/blox
ENTRYPOINT ["/usr/bin/blox"]
WORKDIR /data
CMD ["serve"]
