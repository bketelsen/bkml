ARG GOLANG_VERSION=1.16
FROM golang:${GOLANG_VERSION} as builder

ARG BKML_VERSION=dev

WORKDIR ${GOPATH}/src/github.com/bketelsen/bkml

# Cache go modules
ENV GO111MODULE=on

COPY go.mod .
COPY go.sum .

RUN go mod download

# Copy sources
COPY . .


# Compile
RUN go build -a \
    -o ${GOPATH}/bin/bkml \
    -ldflags="-s -w -h -X main.Version=${BKML_VERSION}" \
    github.com/bketelsen/bkml

FROM debian:buster-slim

ARG BKML_VERSION

LABEL maintainer="bketelsen@gmail.com" \
      org.label-schema.description="Brian's Modern Life API" \
      org.label-schema.schema-version="1.0" \
      org.label-schema.url="https://github.com/bketelsen/bkml" \
      org.label-schema.vcs-url="https://github.com/bketelsen/bkml" \
      org.label-schema.version="${BKML_VERSION}"

COPY --from=builder /go/bin/bkml /usr/local/bin/bkml
COPY --from=builder /etc/ssl/certs /etc/ssl/certs

# Server port to listen
ENV PORT 8080

RUN mkdir -p /data
WORKDIR /data
# Drop privileges for non-UID mapped environments
USER nobody


# Run the entrypoint command by default when the container starts.
ENTRYPOINT ["/usr/local/bin/bkml"]

# Expose the server TCP port
EXPOSE ${PORT}
CMD ["serve"]
