"use strict";var calculateDamage=function(n,t){return(Math.pow(n,3)/32+32)*(Math.pow(t-280.4,2)/110+16)/730*(730-(51*t-Math.pow(t,2)/11)/10)/7300},calculateDamage2=function(n,t){return n*n/(n+t)},mod=function(n,t){return(n%t+t)%t},randomBoolean=function(){return randomInteger(10)<5};