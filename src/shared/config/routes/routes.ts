import type { ComponentType, PropsWithChildren } from "react";

export enum RouteNames {
	LOGIN = "/login",
	HOME = "/",
}

export interface RouteDescription {
	path: RouteNames;
	component: ComponentType;
	layout?: ComponentType<PropsWithChildren>;
}
