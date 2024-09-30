import {Model, BeforeCreate, Column, DataType, Default, PrimaryKey, Table, Unique } from "sequelize-typescript";
import * as bcrypt from "bcryptjs";

@Table({ createdAt: true, updatedAt: false, timestamps: true, tableName: "users"})
export class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4())
    @Column(DataType.UUID)
    public id: string;

    @Unique
    @Column(DataType.STRING(100))
    public email: string;

    @Unique
    @Column(DataType.STRING(20))
    public username: string;

    @Column(DataType.STRING)
    public password: string;

    @Column(DataType.STRING)
    public about: string;

    @Default("https://res.cloudinary.com/dhi3unz48/image/upload/f_auto,q_auto/rrxdozrqznga8opobkjj")
    @Column(DataType.STRING)
    public image: string;

    @Column(DataType.ARRAY(DataType.UUID))
    public friends: Array<string>;

    @Column(DataType.ARRAY(DataType.UUID))
    public blocked: Array<string>;

    @Column(DataType.ARRAY(DataType.UUID))
    public requests: Array<string>;

    @BeforeCreate
    static async hashPassword(user: User) {
        if(user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
            return user.setDataValue('password', hashedPassword);
        }
    }
}



