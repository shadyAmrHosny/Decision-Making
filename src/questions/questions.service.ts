import { Injectable, NotFoundException,Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import {  CACHE_MANAGER } from '@nestjs/cache-manager';
import { BeforeApplicationShutdown } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';


@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private repo: Repository<Question>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache

  ) {}

  async beforeApplicationShutdown() {
    console.log('Application is shutting down. Clearing the cache...');
    await this.cacheManager.reset();
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    let parentQuestion = null;


    if (createQuestionDto.parent_id) {
      parentQuestion = await this.repo.findOne({
        where: { id: createQuestionDto.parent_id },
      });

      if (!parentQuestion) {
        throw new NotFoundException(`Parent question with ID ${createQuestionDto.parent_id} not found`);
      }
    }

    const question = this.repo.create(createQuestionDto);
    const savedQuestion = await this.repo.save(question);

    await this.cacheManager.del('question_tree');

    return savedQuestion;
  }


  async findAll() {

    const cachedTree = await this.cacheManager.get('question_tree');

    //Improves performance by reducing the need to repeatedly query the database for the question tree
    if (cachedTree) {
      console.log('caching tree found')
      return cachedTree;
    }

    const questions = await this.repo.find({ where: { active: true } });

    const tree = this.buildTree(questions);

    await this.cacheManager.set('question_tree',tree,3600000)

    return tree;
  }

  private buildTree(questions: Question[], parentId: number | null = null): any[] {
    return questions
      .filter(question => question.parent_id === parentId)
      .map(question => ({
        ...question,
        children: this.buildTree(questions, question.id),
      }));
  }

  async findQuestionWithChildren(id: number): Promise<any> {
    const question = await this.repo.findOne({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    const questions = await this.repo.find({ where: { active: true } });
    const tree = this.buildTreeForSingleQuestion(questions, id);

    return tree;
  }

  private buildTreeForSingleQuestion(questions: Question[], parentId: number): any {

    const rootQuestion = questions.find(q => q.id == parentId);

    if (!rootQuestion) {
      throw new NotFoundException(`Root question with ID ${parentId} not found`);
    }

    return {
      ...rootQuestion,
      children: this.buildTree(questions, rootQuestion.id),
    };
  }



  async findOne(id: number) {
    if (!id){return null;}
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<Question>){
    const question = await this.findOne(id);
    if (!question){
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    Object.assign(question, attrs);
    const updatedQuestion = await this.repo.save(question);

    await this.cacheManager.del('question_tree');

    return updatedQuestion;
  }

  async remove(id: number) {
    const question = await this.repo.findOne({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    await this.repo.remove(question);

    await this.cacheManager.del('question_tree');

  }
}