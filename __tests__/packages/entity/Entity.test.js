/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { Entity } from "@packages/entity/Entity";
import { Collection } from "@packages/collection/Collection";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

const book = {
    id: 10,
    title: 'The Art of Learning',
    category: 'Personal Development',
    scores: { reviews: 2 },
    files: { cover: 'https://initial.jpg', publisher: new File([''], '') },
    author: { sign: 324, nickname: 'Josh Waitzkin', nationality: 'American' },
    reviews: [
        { id: 1, user: { id: 10, name: 'John', surname: 'Doe' }, message: 'A brilliant book!'},
        { id: 2, user: { name: 'Jane', surname: 'Smith' }, message: 'This book is amazing!' }
    ]
};

describe('packages/Entity', () => {
    let entity;

    beforeEach(() => {
        entity =  new Book();
    });

    describe('entity.fill()', () => {
        beforeEach(() => {
            entity.fill(book);
        });

        it('Должно обновить заполняемое поле', () => {
            expect(entity.attribute('title')).toBe('The Art of Learning');

            entity.fill({
                title: 'Clean Code: A Handbook of Agile Software'
            }, true);

            expect(entity.attribute('title')).toBe('Clean Code: A Handbook of Agile Software');
        });
        it('Должен вернуть значения атрибутов сущности', () => {
            expect(entity.attribute('id')).toBe(10);
            expect(entity.attribute('title')).toBe('The Art of Learning');
            expect(entity.attribute('category')).toBe('Personal Development');
            expect(entity.attribute(
                'not_found_property',
                (value) => value,
                'Undefined value'
            )).toBe('Undefined value');
        });
        it('Должен вернуть вложенные значения атрибутов сущности', () => {
            expect(entity.attributeFromNested(['scores', 'reviews'])).toBe(2);
            expect(entity.attributeFromNested(['files', 'publisher'])).toBeInstanceOf(File);
        });
        it('Должен не заменять, а обновлять или дополнять вложенные объекты атрибутов сущности', () => {
            expect(entity.attributeFromNested(['files', 'publisher'])).toBeInstanceOf(File);
            entity.fill({
               files: {
                   publisher: 'https://updated.jpg'
               }
            });

            expect(entity.attribute('files')).toEqual({
                cover: 'https://initial.jpg',
                publisher: 'https://updated.jpg'
            });
        });

        describe('Entity.relationshipOneToOne()', () => {
            it('Должен вернуть экземпляр связи автора', () => {
                expect(entity.relationshipOneToOne('author')).toBeInstanceOf(Author);
                expect(entity.relationshipOneToOne('author', (author) => author.attribute('sign'))).toBe(324);
            });
            it('Должен вернуть значение по умолчанию, если отношение 1:1 не найдено', () => {
                expect(entity.relationshipOneToOne('unknown')).toBeNull();
            });
        });

        describe('Entity.relationshipOneToMany()', () => {
            it('Должен вернуть экземпляр коллекции отношений', () => {
                expect(entity.relationshipOneToMany('reviews')).toBeInstanceOf(Collection);
            });
            it('Должен вернуть значение по умолчанию, если отношение 1:N не найдено', () => {
                expect(entity.relationshipOneToMany('unknown')).toBeNull();
            });
        });
    });

    describe('Entity.pull()', () => {
        it('Должен вытащить все заполненные данные', () => {
            entity.fill(book);

            expect(entity.pull()).toEqual(book);
        });
    });

    describe('Entity.getAttributes', () => {
        beforeEach(() => {
            entity.fill(book);
        });

        it('Должен возвращать все атрибуты, если не указаны значения "onlyRule"', () => {
            expect(entity.getAttributes()).toEqual(entity.attributes);
        });

        it('должен возвращать только указанные атрибуты, если указаны значения "onlyRule"', () => {
            const onlyProps = ['title', { files: ['cover'] }];
            const expected = { title: 'The Art of Learning', files: { cover: 'https://initial.jpg' } };

            expect(entity.getAttributes(onlyProps)).toEqual(expected);
        });
    });

    describe('Entity.getFillableAttributes', () => {
        beforeEach(() => {
            entity.fill(book);
        });

        it('Должен возвращать все атрибуты, если не указаны значения "onlyRule"', () => {
            const expectedFillableAttributes = {
                title: 'The Art of Learning',
                category: 'Personal Development',
                files: { cover: 'https://initial.jpg', publisher: new File([''], '') },
            };

            expect(entity.getFillableAttributes()).toEqual(expectedFillableAttributes);
        });

        it('должен возвращать только указанные атрибуты, если указаны значения "onlyRule"', () => {
            const onlyProps = ['id', 'title', 'scores',{ files: ['cover'] }];
            const expected = {title: 'The Art of Learning', files: { cover: 'https://initial.jpg' }};

            expect(entity.getFillableAttributes(onlyProps)).toEqual(expected);
        });
    });
});



class Book extends Entity {
    /**
     * @extends Entity
     */
    rules() {
        return {
            attributes: ['id', 'title', 'category', {
                files: ['cover', 'publisher'],
                scores: ['reviews'],
                reviews: ['message', { user: ['surname'] }]
            }],
            fillable: ['title', 'category', { files: ['cover', 'publisher'] }],
            relationships: ['author', 'reviews'],
        }
    }

    /**
     * @extends Entity
     */
    labels() {
        return {
            title: 'Заголовок книги',
            category: 'Категория книги',
        };
    }

    /**
     * @extends Entity
     */
    placeholders() {
        return {
            title: 'Заголовок книги',
            category: 'Категория книги',
        };
    }

    /**
     * Связь канала
     *
     * @param {object} author
     *
     * @return {Author}
     */
    author(author) {
        return (new Author()).fill(author);
    }

    /**
     * Связь канала
     *
     * @param {object[]} reviews
     *
     * @return {Collection}
     */
    reviews(reviews) {
        return new Collection().forEntity(Review).fill(reviews);
    }
}

class Author extends Entity {
    static primaryKey = 'sign'

    /**
     * @extends Entity
     */
    rules() {
        return {
            attributes: ['sign', 'nickname', 'nationality'],
            fillable: ['nickname', 'nationality'],
            relationships: []
        }
    }
}

/**
 * @class Review
 */
class Review extends Entity {

    /**
     * @extends Entity
     */
    rules() {
        return {
            attributes: ['id', 'message'],
            fillable: ['message'],
            relationships: ['user']
        }
    }

    /**
     * @param {object} user
     *
     * @return {User}
     */
    user(user) {
        return (new User()).fill(user);
    }
}

/**
 * @class User
 */
class User extends Entity {
    /**
     * @extends Entity
     */
    rules() {
        return {
            attributes: ['id', 'name', 'surname'],
            fillable: ['name', 'surname']
        }
    }
}