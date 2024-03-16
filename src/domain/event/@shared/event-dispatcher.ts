import EventDispatcherInterface from './event-dispatcher.interface'
import { EventHandlerInterface } from './event-handler.interface'
import { EventInterface } from './event.interface'

export class EventDispatcher implements EventDispatcherInterface {
  readonly eventHandlers: Record<
    string,
    EventHandlerInterface<EventInterface>[]
  > = {}

  notify(event: EventInterface): void {}

  register(
    eventName: string,
    handler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(handler)
  }

  unregister(
    eventName: string,
    handler: EventHandlerInterface<EventInterface>
  ): void {}

  unregisterAll(): void {}
}
