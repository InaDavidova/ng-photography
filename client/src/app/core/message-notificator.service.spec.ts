import { TestBed } from '@angular/core/testing';

import { MessageNotificatorService } from './message-notificator.service';

describe('MessageNotificatorService', () => {
  let service: MessageNotificatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageNotificatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
