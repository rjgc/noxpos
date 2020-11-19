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
let ref;
let urlVal;
let cacheVal = 'no';
let app = {
    // Application Constructor
    initialize: function(url,cache) {
        urlVal = url;
        cacheVal = cache;
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButton, false);
        //document.addEventListener('beforeunload', this.onBeforeUnload);
    },

    onBackButton: function(event) {
        event.preventDefault();
        navigator.notification.confirm("Sair da aplicação?", this.onConfirm, "Confirmar", "Sim,Não");
    },

    onConfirm: function(button) {
        if(button == 2){//If User selected No, then we just do nothing
            return;
        }else{
            navigator.app.exitApp();
        }
    },


    onExit: function(event) {
        event.preventDefault();
        navigator.notification.confirm("Ir para configurações?", this.onExitConfirm, "Confirmar", "Sim,Não");
    },

    onExitConfirm: function(button) {
        if(button == 2){//If User selected No, then we just do nothing
            return;
        }else{
            ref.close();
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
    onDeviceReady: function () {
        //app.receivedEvent('deviceready');
        ref = cordova.InAppBrowser.open(urlVal, '_blank', 'location=no,clearsessioncache='+cacheVal+',toolbar=yes,zoom=no,closebuttoncaption=Sair');
        ref.addEventListener('exit', this.onExit, false);

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
