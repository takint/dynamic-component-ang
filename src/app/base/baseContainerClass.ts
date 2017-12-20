import { PayLoad, BaseDropClass } from "../base/baseDropClass";
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';

export class BaseContainerClass {

    private componentDict = {};
    private hostElement: any;
    private componentArr = [];
    constructor(componentDict: any, private componentFactoryResolver: ComponentFactoryResolver, private isDuplicateAllow: boolean) {
        this.componentDict = componentDict;
    }

    setContainerRef(hostingElement) {
        this.hostElement = hostingElement;
    }

    onDrop(ev: any) {
        ev.preventDefault();
        ev.stopPropagation();
        var dataStr = ev.dataTransfer.getData("text");
        var data = JSON.parse(dataStr) as PayLoad;
        this.loadComponent(data, this.isDuplicateAllow);
        console.log(data);
    }

    trackingRemove(removePayload: any) {
        console.log("trackingRemove", removePayload);
    }

    loadComponent(payload: PayLoad, isDuplicateAllow: boolean = false) {
        let foundComponent = this.componentDict[payload.componentType];
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(foundComponent);
        let viewContainerRef = this.hostElement.viewContainerRef;
        if (!isDuplicateAllow) viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentArr.push(foundComponent);
        var trueTypeComponent = componentRef._component as BaseDropClass;
        trueTypeComponent.index = this.componentArr.length;
        trueTypeComponent.parentRef = viewContainerRef;
        trueTypeComponent.deleteObs.subscribe(r => this.trackingRemove(r));
        //(<AdComponent>componentRef.instance).data = adItem.data;
    }

    allowDrop(ev) {
        ev.preventDefault();
        //console.log(event)
        return false;
    }

    dragenter(ev) {
        //ev.preventDefault();
        console.log(event)
    }

    dragleave(ev) {
        //ev.preventDefault();
        console.log(event)
    }
}