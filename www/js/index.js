/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        // Block scrolling
        document.body.addEventListener("touchmove", function(e) {
            e.preventDefault();
        }, false);
        //window.onscroll = function () { window.scrollTo(0, 0); };
        //document.ontouchmove = function(e) { e.preventDefault(); };
        
        // Bind all other events
        this.bindEvents();
        
        // Install scroll
        //Scroller(document.getElementsByClassName("content")[0]);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //window.addEventListener('resize', this.onResize, false);
        //window.addEventListener('updateSize', this.onResize, false);
    },
    // Fire Events
    fireEvent: function(name) {
        console.log("### Fire event: " + name);
        var e = document.createEvent('Events'); 
        e.initEvent(name, true, false);
        document.dispatchEvent(e);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // Configure keyboard for iOS
        Keyboard.shrinkView(true);
        Keyboard.hideFormAccessoryBar(false);
        Keyboard.disableScrollingInShrinkView(false);
        
        document.body.style.height(window.innerHeight);
    },
    // onResize
    onResize: function() {
        console.log("onResize");
        var width, height;
        var logDimensions = function(width, height) {
            console.log("width=" + width + ", height=" + height);
        };
        // 1
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
        logDimensions(width,height);
        
        // Update content
        var content = document.getElementsByClassName("content")[0];
        content.style.height = (height - content.offsetTop) + "px";
        
        document.getElementById("width").innerHTML = width;
        document.getElementById("height").innerHTML = height;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};