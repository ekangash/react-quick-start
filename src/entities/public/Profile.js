/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
import { yup } from "@config/yup/yup";

/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
import { AppEntity } from "@entities/AppEntity";

/** 6 Resources */

/**
 * Класс сущности "Должностные лица"
 *
 * @class
 */
export class Profile extends AppEntity {
    /**
     * @extends AppEntity
     */
    endpointSchemaName = 'public'
    /**
     * @extends AppEntity
     */
    endpointTableName = 'profile'

    /**
     * @extends AppEntity
     */
    rules() {
        return {
            attributes: ['id', 'fullname', 'mobile_number', 'email', 'is_active', 'login', 'created_at'],
            fillable: ['fullname', 'mobile_number', 'email', 'is_active', 'login'],
        }
    }

    /**
     * @extends AppEntity
     */
    labels() {
        return {
            id: 'Идентификатор должностного лица',
            fullname: 'Полное имя',
            mobile_number: 'Рабочий мобильный номер',
            email: 'Адрес электронной почты',
            is_active: 'Признак активности сотрудника (по назначению задач)',
            login: 'Логин',
            created_at: 'Дата создание',
        };
    }

    /**
     * @extends AppEntity
     */
    placeholders() {
        return {
            fullname: 'Полное имя',
            mobile_number: 'Мобильный номер'
        };
    }

    /**
     * @extends AppEntity
     */
    schema = () => yup.object({
        fullname: yup.string().required().max(20),
        mobile_number: yup.string().max(20),
        email: yup.string().email().max(100),
        is_active: yup.bool(),
        login: yup.string().required().serverValidation(),
    })
}