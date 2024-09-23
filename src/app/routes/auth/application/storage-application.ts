import { Inject, Injectable } from '@angular/core';
import { StorageRepository } from '../domain/storage-repository';
import { StorageInfrastructure } from '../infrastructure/storage-infrastructure';

@Injectable()
export class StorageApplication {
  constructor(
    @Inject(StorageInfrastructure) private readonly storageRepository: StorageRepository
  ) {}

  setField(propertyName: string, value: any): void {
    this.storageRepository.setStorage(propertyName, value);
  }

  getField(propertyName: string): string | null {
    return this.storageRepository.getStorage(propertyName);
  }

  clear(): void {
    this.storageRepository.clear();
  }
}
