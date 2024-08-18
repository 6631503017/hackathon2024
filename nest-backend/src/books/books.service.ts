import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/books.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) : Promise<Book> {
    const bookDoc = new this.bookModel(createBookDto);
    const book = await bookDoc.save();
    return book.toObject();
  }

  async findAll() {
    return this.bookModel.find().exec();
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: string) {
    const user = await this.bookModel.findByIdAndDelete(id).lean();
    if (!user) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return user;
  }
}
