import test from 'node:test';
import assert from 'node:assert/strict';
import { curriculumLessons, getCurriculumLessonBySlug } from './curriculum-data.js';

test('curriculum data includes the core DSA roadmap', () => {
  assert.ok(curriculumLessons.length >= 6);
  assert.ok(curriculumLessons.some((lesson) => lesson.slug === 'arrays-and-strings'));
});

test('lesson lookup resolves exact slugs', () => {
  const lesson = getCurriculumLessonBySlug('trees');
  assert.equal(lesson?.title, 'Trees and Traversals');
});
