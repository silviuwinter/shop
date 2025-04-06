import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// this file tests the app controller
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // sets up the controller for testing
      providers: [AppService], // provides the service for the controller
    }).compile();

    appController = app.get<AppController>(AppController); // gets the controller instance
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); // checks if the greeting is correct
    });
  });
});
