docker run --rm -it \
    --ipc=host \
    --name "$container_name" \
    -p 0.0.0.0:3000:3000  \
    -v ${PWD}:/root \
    snuspl/swpp:hw3 \
    /bin/bash
