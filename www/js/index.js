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
    initialize: function(url) {
        this.bindEvents(url);
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function(url) {
        document.addEventListener('deviceready', this.onDeviceReady(url), false);
        document.addEventListener('backbutton', this.onBackButton, false);
        document.addEventListener('beforeunload', this.onBeforeUnload);
    },

    onBackButton: function(event) {
        event.preventDefault();
        if(history.length==1){
            alert('Close2');
            window.open('mobile/close');
        }else{
            alert('Back2');
            history.back();
        }
    },

    onBeforeUnload: function(event) {
        event.preventDefault();
        event.returnValue = '';
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function (url) {
        //app.receivedEvent('deviceready');
        var ref = window.open(url, '_self', 'location=no,toolbar=yes,zoom=no,closebuttoncaption=Sair');
        ref.addEventListener('loadstart', function(event) {
            if (event.url.match("mobile/close")) {
                ref.close();
            }
        });

        document.addEventListener("backbutton", function (e) {
            alert('Working');
            e.preventDefault();

            if(history.length==1){
                alert('Close');
                ref.close();
            }else{
                alert('Back');
                history.back();
            }
        }, false );
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};
