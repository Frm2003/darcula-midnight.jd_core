import ApplicationContext from "../bootstrap/ApplicationContext.js";

export type BeanDefinition = {
    dependencies: Token[];
    factory: Factory;
    scope: BeanScope;
    stereoType: string;
    token: Token;
    target: DefaultClass;
};

export type BeanScope = "singleton" | "transient";

export type BeanStereotype = "Controller" | "Repository" | "Service" | "Module";

export interface DarculaModule {
    bootstrap(context: ApplicationContext): Promise<void> | void;
}

export type DefaultClass<T extends object = object> = new (...args: any[]) => T;

export type DefaultModule = {
    default: DefaultClass;
};

export type Factory<T extends object = object> = (...args: any[]) => T;

export type Token = symbol | DefaultClass;
