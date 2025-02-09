import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from "./authStore";


const wrapper = mount(() => {
  return useAuthStore();
}, {
  plugins: [createTestingPinia()],
});

const store = useAuthStore();

describe('authStore', () => {
  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});