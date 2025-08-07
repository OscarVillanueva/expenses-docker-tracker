import { mysqlTable, int, varchar, boolean, datetime, decimal, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Purpose table schema
export const purpose = mysqlTable('purpose', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull().default('0'),
  belong_to: varchar('belong_to', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

// Transaction table schema
export const transaction = mysqlTable('transaction', {
  id: int('id').primaryKey().autoincrement(),
  date: datetime('date').notNull(),
  is_expense: boolean('is_expense').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  included_in: int('included_in').notNull(),
  is_cash: boolean('is_cash').notNull(),
});

// Accumulated table schema
export const accumulated = mysqlTable('accumulated', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  belong_to: varchar('belong_to', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

// Define relations
export const purposeRelations = relations(purpose, ({ many }) => ({
  transactions: many(transaction),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  purpose: one(purpose, {
    fields: [transaction.included_in],
    references: [purpose.id],
  }),
}));
