if(NOT TARGET ReactAndroid::hermestooling)
add_library(ReactAndroid::hermestooling SHARED IMPORTED)
set_target_properties(ReactAndroid::hermestooling PROPERTIES
    IMPORTED_LOCATION "C:/Users/mma4s/.gradle/caches/8.14.3/transforms/cb5d85857fa77ab8a01df7cc8f97f35c/transformed/react-android-0.82.0-debug/prefab/modules/hermestooling/libs/android.x86_64/libhermestooling.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/mma4s/.gradle/caches/8.14.3/transforms/cb5d85857fa77ab8a01df7cc8f97f35c/transformed/react-android-0.82.0-debug/prefab/modules/hermestooling/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

if(NOT TARGET ReactAndroid::jsi)
add_library(ReactAndroid::jsi SHARED IMPORTED)
set_target_properties(ReactAndroid::jsi PROPERTIES
    IMPORTED_LOCATION "C:/Users/mma4s/.gradle/caches/8.14.3/transforms/cb5d85857fa77ab8a01df7cc8f97f35c/transformed/react-android-0.82.0-debug/prefab/modules/jsi/libs/android.x86_64/libjsi.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/mma4s/.gradle/caches/8.14.3/transforms/cb5d85857fa77ab8a01df7cc8f97f35c/transformed/react-android-0.82.0-debug/prefab/modules/jsi/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

if(NOT TARGET ReactAndroid::reactnative)
add_library(ReactAndroid::reactnative SHARED IMPORTED)
set_target_properties(ReactAndroid::reactnative PROPERTIES
    IMPORTED_LOCATION "C:/Users/mma4s/.gradle/caches/8.14.3/transforms/cb5d85857fa77ab8a01df7cc8f97f35c/transformed/react-android-0.82.0-debug/prefab/modules/reactnative/libs/android.x86_64/libreactnative.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/mma4s/.gradle/caches/8.14.3/transforms/cb5d85857fa77ab8a01df7cc8f97f35c/transformed/react-android-0.82.0-debug/prefab/modules/reactnative/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

