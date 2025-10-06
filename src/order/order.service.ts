import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./models/order.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id, {
      include: { all: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.orderModel.update(updateOrderDto, { where: { id } });
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await order.destroy();
    return { message: `Order with ID ${id} deleted successfully` };
  }
}
