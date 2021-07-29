ARG GOLANG_VERSION=1.16
FROM golang:${GOLANG_VERSION} as builder

ARG BKML_VERSION=dev
ARG LIBVIPS_VERSION=8.10.0
ARG GOLANGCILINT_VERSION=1.29.0

# Installs libvips + required libraries
RUN DEBIAN_FRONTEND=noninteractive \
  apt-get update && \
  apt-get install --no-install-recommends -y \
  ca-certificates \
  automake build-essential curl \
  gobject-introspection gtk-doc-tools libglib2.0-dev libjpeg62-turbo-dev libpng-dev \
  libwebp-dev libtiff5-dev libgif-dev libexif-dev libxml2-dev libpoppler-glib-dev \
  swig libmagickwand-dev libpango1.0-dev libmatio-dev libopenslide-dev libcfitsio-dev \
  libgsf-1-dev fftw3-dev liborc-0.4-dev librsvg2-dev libimagequant-dev libheif-dev && \
  cd /tmp && \
  curl -fsSLO https://github.com/libvips/libvips/releases/download/v${LIBVIPS_VERSION}/vips-${LIBVIPS_VERSION}.tar.gz && \
  tar zvxf vips-${LIBVIPS_VERSION}.tar.gz && \
  cd /tmp/vips-${LIBVIPS_VERSION} && \
	CFLAGS="-g -O3" CXXFLAGS="-D_GLIBCXX_USE_CXX11_ABI=0 -g -O3" \
    ./configure \
    --disable-debug \
    --disable-dependency-tracking \
    --disable-introspection \
    --disable-static \
    --enable-gtk-doc-html=no \
    --enable-gtk-doc=no \
    --enable-pyvips8=no && \
  make && \
  make install && \
  ldconfig

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

COPY --from=builder /usr/local/lib /usr/local/lib
COPY --from=builder /go/bin/bkml /usr/local/bin/bkml
COPY --from=builder /etc/ssl/certs /etc/ssl/certs

# Install runtime dependencies
RUN DEBIAN_FRONTEND=noninteractive \
  apt-get update && \
  apt-get install --no-install-recommends -y \
  procps libglib2.0-0 libjpeg62-turbo libpng16-16 libopenexr23 \
  libwebp6 libwebpmux3 libwebpdemux2 libtiff5 libgif7 libexif12 libxml2 libpoppler-glib8 \
  libmagickwand-6.q16-6 libpango1.0-0 libmatio4 libopenslide0 \
  libgsf-1-114 fftw3 liborc-0.4-0 librsvg2-2 libcfitsio7 libimagequant0 libheif1 && \
  apt-get autoremove -y && \
  apt-get autoclean && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Server port to listen
ENV PORT 8080

RUN mkdir /data
COPY data /data
WORKDIR /data
RUN ls -la /data
# Drop privileges for non-UID mapped environments
USER nobody


# Run the entrypoint command by default when the container starts.
ENTRYPOINT ["/usr/local/bin/bkml"]

# Expose the server TCP port
EXPOSE ${PORT}
CMD ["serve"]
