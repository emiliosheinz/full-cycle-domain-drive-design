import { SendEmailWhenProductIsCreatedHandler } from '../product/handler/send-email-when-product-is-created.handler'
import { EventDispatcher } from './event-dispatcher'

describe('Domain events', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'][0]).toBe(
      eventHandler
    )
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(0)
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    eventDispatcher.unregisterAll()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeUndefined()
  })
})
