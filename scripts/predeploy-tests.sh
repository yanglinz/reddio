#!/bin/bash

shopt -s extglob


# test if image files are properly md5'd

for i in `find src/_assets/ -type f -name "*.svg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif"`; do
    path=`echo $i | sed 's#src/#build/#'`
    prefix=`echo $path | sed 's#^\(.*\)\.[a-z]*$#\1#'`
    postfix=`echo $path | sed 's#^.*\(\.[a-z]*\)$#\1#'`
    command="ls $prefix-*([a-zA-Z0-9])$postfix"
    ls=`$command 2>&1`
    exit=$?
    if [ $exit -ne 0 ]; then
        echo "$i has not been minified: $ls"
        exit 1
    fi
    wc=`$command | wc -l`
    exit=$?
    if [ $wc -ne 1 ]; then
        echo "$i has not been minified: $wc files found in the build directory: $ls"
        exit 1
    fi
    echo "$i minified to $ls"
done


# test if javascript file is properly md5'd

ls build/_assets/scripts/main-*.js | wc -l
if [ $count -eq 0 ]; then
    echo "No main-*.js file found"
    exit 1
fi


# test if css files are properly md5'd

for i in `find src -type f -name "*.scss" -not -name "_*.scss"`; do
    path=`echo $i | sed 's#src/#build/#'`
    prefix=`echo $path | sed 's#^\(.*\)\.[a-z]*$#\1#'`
    postfix=".css"
    command="ls $prefix-*([a-zA-Z0-9])$postfix"
    ls=`$command 2>&1`
    exit=$?
    if [ $exit -ne 0 ]; then
        echo "$i has not been minified: $ls"
        exit 1
    fi
    wc=`$command | wc -l`
    exit=$?
    if [ $wc -ne 1 ]; then
        echo "$i has not been minified: $wc files found in the build directory: $ls"
        exit 1
    fi
    echo "$i minified to $ls"
done
exit 0
