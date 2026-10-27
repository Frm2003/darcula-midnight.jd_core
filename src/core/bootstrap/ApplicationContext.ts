import BeanManager from "../di/BeanManager.js";
import Container from "../di/Container.js";
import ClassLoader from "../infra/ClassLoader.js";

import { BeanDefinition, BeanStereotype, DarculaModule, Token } from "../types/index.js";

export default class ApplicationContext {
    private container = new Container();

    public static async create(): Promise<ApplicationContext> {
        const context = new ApplicationContext();
        const modules = await ClassLoader.modules();

        const beans = BeanManager.discovery(modules);

        for (const bean of beans.values()) {
            context.container.register(bean);
        }

        context.container.registerInstance(ApplicationContext, context);
        context.container.init();

        return context;
    }

    public get<T extends object>(token: Token): T {
        return this.container.get(token);
    }

    public getDefinitions(
        stereoType: BeanStereotype | undefined = undefined,
    ): Iterable<BeanDefinition> {
        return this.container.getDefinitions(stereoType);
    }

    public static async run(): Promise<void> {
        const context = await ApplicationContext.create();

        for (const definition of context.getDefinitions("Module")) {
            const module = context.get<DarculaModule>(definition.token);
            module.bootstrap(context);
        }
    }
}
