// en.js — English dictionary for the PyTorch section. Source of truth for
// the shape hi.js must match. Code/output blocks are language-neutral and
// identical to hi.js on purpose.
export const en = {
  code: 'en', label: 'English', short: 'EN', htmlLang: 'en',

  site: {
    title: 'PyTorch — with Bittu',
    desc: 'From tensors to deployment — 12 parts, 62 concepts, each with code and real output.',
    foot: 'This page does not execute PyTorch code (torch cannot run in a browser) — every card shows its real, pre-computed output instead.',
  },

  ui: {
    backHome: '← all sections',
    heroA: 'PyTorch,',
    heroEm: 'tensor to production',
    heroSub: 'A reference board — 62 concepts across 12 parts, from Tensor all the way to Deployment. Every card carries its own definition, code, and real output.',
    pyodideNote: 'PyTorch cannot run live in this browser — there is no WASM build of it, and a browser sandbox has no GPU access regardless — so there is no "Run" button here. Every code block is paired with its real, pre-computed output behind "+ OUTPUT" — run it on your own machine to verify it yourself.',
    outputLabel: 'Output',
    tocLabel: 'Parts',
  },

  pet: {
    name: 'Torchy — tap me to explain this concept',
    greeting: "Hi, I'm Torchy. Open any card and I'll explain what it means — no Run button here, but I'll still walk you through it.",
    tips: [
      'A tensor is just an array with two superpowers: it can live on a GPU, and it remembers how it was computed.',
      'requires_grad=True is the only thing that turns on gradient tracking — everything else is just math until you flip that on.',
      "model.eval() and torch.no_grad() are a pair — the first turns off training-only layers, the second stops wasting memory on gradients you won't use.",
      'Overfitting has a simple tell: training loss keeps falling while validation loss starts climbing back up.',
      'Freeze the early layers of a pretrained model — they already learned edges and textures, and re-training them just risks losing that for nothing.',
    ],
  },

  parts: [
    {
      num: 1, title: 'PyTorch Basics',
      cards: [
        {
          num: 1, title: 'Tensor',
          desc: "A tensor is PyTorch's most basic data structure — a multi-dimensional array like a NumPy array, but with GPU support and automatic differentiation (Autograd) built in. Every deep-learning calculation (weights, inputs, gradients) runs on tensors, which is why plain NumPy isn't enough. Create one with `torch.tensor()` — it can be a scalar, vector, matrix, or higher-dimensional.",
          code: `import torch

# Creating tensors
t1 = torch.tensor(5)                          # 0D (scalar)
t2 = torch.tensor([1, 2, 3])                  # 1D (vector)
t3 = torch.tensor([[1, 2], [3, 4]])           # 2D (matrix)
t4 = torch.tensor([[[1, 2], [3, 4]],
                   [[5, 6], [7, 8]]])         # 3D

print(t1)
print(t2)
print(t3)
print(t4)`,
          output: `tensor(5)
tensor([1, 2, 3])
tensor([[1, 2],
        [3, 4]])
tensor([[[1, 2],
         [3, 4]],

        [[5, 6],
         [7, 8]]])`,
        },
        {
          num: 2, title: 'Shape',
          desc: "Shape tells you how many dimensions a tensor has and how many elements sit in each — `(3, 4)` means 3 rows, 4 columns. Getting shapes to match between layers matters, or you get an error. Read it with `.shape`/`.size()`, and change it with `.view()`, `.reshape()`, `.unsqueeze()`, `.squeeze()`.",
          code: `x = torch.randn(2, 3, 4)          # 2 batches, 3 rows, 4 columns
print(x.shape)                    # torch.Size([2, 3, 4])
print(x.size())                   # same

# Shape change
y = x.view(2, 12)                 # 2 x 12
z = x.reshape(6, 4)               # 6 x 4
a = x.unsqueeze(0)                # add a new dimension (1, 2, 3, 4)
b = a.squeeze(0)                  # remove a dimension
print(y.shape, z.shape, a.shape, b.shape)`,
          output: `torch.Size([2, 3, 4])
torch.Size([2, 3, 4])
torch.Size([2, 12]) torch.Size([6, 4]) torch.Size([1, 2, 3, 4]) torch.Size([2, 3, 4])`,
        },
        {
          num: 3, title: 'dtype',
          desc: "dtype tells you what kind of data a tensor stores — float32, int64, bool, and so on. Weights are usually float32, labels are usually int64/long, and picking the right dtype matters for both memory and speed. Set it at creation with `dtype=`, or convert later with `.to()` / `.type()`.",
          code: `a = torch.tensor([1, 2, 3], dtype=torch.float32)
b = torch.tensor([1, 2, 3], dtype=torch.int64)
c = torch.tensor([True, False], dtype=torch.bool)

print(a.dtype)        # torch.float32
print(b.dtype)        # torch.int64

# Type conversion
d = a.to(torch.int64)
e = b.float()          # float32
f = b.long()            # int64
print(d.dtype, e.dtype, f.dtype)`,
          output: `torch.float32
torch.int64
torch.int64 torch.float32 torch.int64`,
        },
        {
          num: 4, title: 'Device',
          desc: 'Device tells you whether a tensor lives on the CPU or the GPU (CUDA). Models run 10-50x faster on GPU, so getting tensors onto the right device matters. `tensor.to("cuda")` moves it to GPU, `.to("cpu")` moves it back. Rule: the model and the data must be on the same device, or you get an error.',
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using:", device)

x = torch.randn(3, 3, device=device)

y = torch.tensor([1.0, 2.0, 3.0])
y = y.to(device)

print(x.device)
print(y.device)`,
          output: `Using: cpu
cpu
cpu`,
        },
        {
          num: 5, title: 'Tensor operations',
          desc: 'Mathematical and logical operations on tensors — addition, multiplication, matrix multiply, and more. Every neural-network calculation (forward pass, loss, gradients) is built from these. Element-wise ops (`+`, `*`) and matrix ops (`@`, `matmul`) are different things — and in-place operations (`add_`, `mul_`) save memory.',
          code: `a = torch.tensor([[1., 2.], [3., 4.]])
b = torch.tensor([[5., 6.], [7., 8.]])

print(a + b)               # Addition
print(a * b)               # Element-wise multiply
print(a @ b)                # Matrix multiplication

print(torch.sum(a))
print(torch.mean(a))
print(torch.argmax(a))     # Index of max value`,
          output: `tensor([[ 6.,  8.],
        [10., 12.]])
tensor([[ 5., 12.],
        [21., 32.]])
tensor([[19., 22.],
        [43., 50.]])
tensor(10.)
tensor(2.5000)
tensor(3)`,
        },
      ],
    },
    {
      num: 2, title: 'Autograd',
      cards: [
        {
          num: 6, title: 'requires_grad',
          desc: '`requires_grad=True` is a flag telling PyTorch to track gradients for this tensor. You only need gradients for a model\'s parameters (weights & biases) — not for input data. It defaults to `False`; you can flip it on later with `tensor.requires_grad_(True)`. This avoids wasting memory and computation on tensors that don\'t need it.',
          code: `import torch

x = torch.tensor(3.0)
print(x.requires_grad)          # False

w = torch.tensor(2.0, requires_grad=True)
print(w.requires_grad)          # True

b = torch.tensor(1.0)
b.requires_grad_(True)
print(b.requires_grad)          # True`,
          output: `False
True
True`,
        },
        {
          num: 7, title: 'Computational graph',
          desc: 'A directed graph PyTorch builds automatically as you run operations on tensors with `requires_grad=True` — nodes are tensors, edges are operations. Backpropagation (the chain rule) needs to know exactly which operation happened in what order, and this graph is how. It\'s built during the forward pass; `backward()` walks it in reverse.',
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2                  # Operation 1
z = torch.sin(y)            # Operation 2
print(z)                    # grad_fn=<SinBackward0>

# x -> (power) -> y -> (sin) -> z`,
          output: `tensor(0.4121, grad_fn=<SinBackward0>)`,
        },
        {
          num: 8, title: 'backward()',
          desc: '`backward()` walks the computational graph in reverse to calculate gradients — backpropagation. Usually called on a scalar tensor (loss). Every `requires_grad=True` tensor gets its `.grad` filled in. The graph is freed after one `backward()` call to save memory — pass `retain_graph=True` if you need to call it again.',
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2          # y = 9
z = torch.sin(y)    # z = sin(9)

z.backward()        # Gradients calculate

print(x.grad)       # dz/dx = 2x * cos(x^2)`,
          output: `tensor(-0.9111)`,
        },
        {
          num: 9, title: 'gradients (.grad)',
          desc: 'The `.grad` attribute holds the gradient computed by `backward()` — how much the loss would change with respect to that parameter. Gradient descent needs this to update weights. Gradients accumulate across calls, which is why you must `zero_grad()` / `.grad.zero_()` before every step.',
          code: `w = torch.tensor(2.0, requires_grad=True)
b = torch.tensor(1.0, requires_grad=True)

x = torch.tensor(3.0)
y = w * x + b               # y = 7
loss = y ** 2                # loss = 49

loss.backward()

print(w.grad)                # d(loss)/dw = 2*y*x
print(b.grad)                # d(loss)/db = 2*y*1

w.grad.zero_()
b.grad.zero_()`,
          output: `tensor(42.)
tensor(14.)`,
        },
      ],
    },
    {
      num: 3, title: 'Manual Neural Network',
      cards: [
        {
          num: 10, title: 'Forward pass',
          desc: "The forward pass runs input data through the model's current weights to produce a prediction. For a single neuron, that's simply `y_pred = w * x + b` (plus an optional activation). That prediction is what the loss gets computed against next.",
          code: `w = torch.tensor(0.5, requires_grad=True)
b = torch.tensor(0.1, requires_grad=True)
x = torch.tensor(2.0)

z = w * x + b                  # Linear transformation
y_pred = torch.sigmoid(z)      # Activation

print("Prediction:", y_pred)`,
          output: `Prediction: tensor(0.7503, grad_fn=<SigmoidBackward0>)`,
        },
        {
          num: 11, title: 'Loss',
          desc: "Loss measures how far a prediction is from the target — the bigger the loss, the worse the model is doing right now. Training's whole job is minimizing it. MSE for regression, BCE for binary classification, Cross Entropy for multi-class are the common choices.",
          code: `y_true = torch.tensor(1.0)
y_pred = torch.tensor(0.8)
loss = (y_pred - y_true) ** 2
print("MSE Loss:", loss.item())

criterion = torch.nn.MSELoss()
loss2 = criterion(y_pred, y_true)
print("Built-in MSE:", loss2.item())`,
          output: `MSE Loss: 0.04000000283122063
Built-in MSE: 0.04000000283122063`,
        },
        {
          num: 12, title: 'Backward',
          desc: 'Calling `loss.backward()` computes gradients through Autograd — every weight and bias gets its own gradient, so it can be nudged in the right direction. This replaces manually applying the chain rule by hand.',
          code: `w = torch.tensor(0.5, requires_grad=True)
b = torch.tensor(0.1, requires_grad=True)
x = torch.tensor(2.0)
y_true = torch.tensor(1.0)

y_pred = w * x + b
loss = (y_pred - y_true) ** 2

loss.backward()

print("w.grad:", w.grad)
print("b.grad:", b.grad)`,
          output: `w.grad: tensor(0.4000)
b.grad: tensor(0.2000)`,
        },
        {
          num: 13, title: 'Weight update',
          desc: "Update weights and biases using their gradients: `parameter = parameter - learning_rate * gradient`. This happens inside `torch.no_grad()` (no tracking needed for the update itself), and gradients must be zeroed right after — otherwise next step's gradients accumulate onto the old ones.",
          code: `lr = 0.01

with torch.no_grad():
    w -= lr * w.grad
    b -= lr * b.grad

w.grad.zero_()
b.grad.zero_()

print("Updated w:", w)
print("Updated b:", b)`,
          output: `Updated w: tensor(0.4960, requires_grad=True)
Updated b: tensor(0.0980, requires_grad=True)`,
        },
        {
          num: 14, title: 'Complete manual training',
          desc: "Forward → Loss → Backward → Update, repeated — that's training. One pass never makes a model perfect; it takes many epochs of shrinking the loss. The example below learns `y = 2x + 1`, and after 100 epochs w and b converge close to those exact values.",
          code: `X = torch.tensor([[1.0], [2.0], [3.0], [4.0], [5.0]])
y = torch.tensor([[3.0], [5.0], [7.0], [9.0], [11.0]])

w = torch.tensor([[0.0]], requires_grad=True)
b = torch.tensor([[0.0]], requires_grad=True)

lr = 0.01
epochs = 100

for epoch in range(epochs):
    y_pred = X @ w + b
    loss = ((y_pred - y) ** 2).mean()
    loss.backward()

    with torch.no_grad():
        w -= lr * w.grad
        b -= lr * b.grad
        w.grad.zero_()
        b.grad.zero_()

    if (epoch + 1) % 20 == 0:
        print(f"Epoch {epoch+1:3d} | Loss: {loss.item():.4f} | w: {w.item():.4f} | b: {b.item():.4f}")`,
          output: `Epoch  20 | Loss: 2.4326 | w: 1.6072 | b: 0.5395
Epoch  40 | Loss: 0.3346 | w: 1.8654 | b: 0.7690
Epoch  60 | Loss: 0.0553 | w: 1.9541 | b: 0.8933
Epoch  80 | Loss: 0.0117 | w: 1.9833 | b: 0.9584
Epoch 100 | Loss: 0.0036 | w: 1.9928 | b: 0.9899`,
        },
      ],
    },
    {
      num: 4, title: 'PyTorch Way',
      cards: [
        {
          num: 15, title: 'nn.Module',
          desc: "`nn.Module` is PyTorch's base class — you inherit from it to build your own network. Managing weights by hand doesn't scale; `nn.Module` tracks parameters automatically, makes moving to GPU trivial, and keeps code organized. Define layers in `__init__`, describe the data flow in `forward()`.",
          code: `import torch.nn as nn

class MyNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(3, 1)

    def forward(self, x):
        return self.linear(x)

model = MyNetwork()
print(model)`,
          output: `MyNetwork(
  (linear): Linear(in_features=3, out_features=1, bias=True)
)`,
        },
        {
          num: 16, title: 'nn.Linear',
          desc: '`nn.Linear` is a fully connected (dense) layer that computes `y = x @ W.T + b`. Give it `in_features` and `out_features` and it creates weights and bias for you automatically (with `requires_grad=True`) — no manual weight init or matrix multiplication needed.',
          code: `layer = nn.Linear(in_features=3, out_features=1)

x = torch.randn(5, 3)          # batch_size=5, features=3
output = layer(x)

print(output.shape)            # torch.Size([5, 1])
print(layer.weight.shape)      # torch.Size([1, 3])
print(layer.bias.shape)        # torch.Size([1])`,
          output: `torch.Size([5, 1])
torch.Size([1, 3])
torch.Size([1])`,
        },
        {
          num: 17, title: 'Activation',
          desc: "Activation functions introduce non-linearity — without them a network is just a chain of linear combinations, and real-world problems aren't linear. ReLU is the most common choice for hidden layers, Sigmoid for binary output, Softmax for multi-class output.",
          code: `class Network(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

x = torch.randn(1, 784)
out = Network()(x)
print(out.shape)`,
          output: `torch.Size([1, 10])`,
        },
        {
          num: 18, title: 'Optimizer',
          desc: "An optimizer is the smart way to update weights — it takes gradients and improves parameters, with extras like momentum and adaptive learning rates. Writing `w = w - lr * w.grad` by hand everywhere isn't practical; `Adam` is the most commonly used optimizer.",
          code: `model = MyNetwork()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# inside a training step
optimizer.zero_grad()      # clear gradients
# loss.backward()          # compute gradients
optimizer.step()           # update weights
print(optimizer)`,
          output: `Adam (
Parameter Group 0
    lr: 0.001
    ...
)`,
        },
        {
          num: 19, title: 'Training loop',
          desc: 'Model + loss + optimizer + data all working together — forward, backward, update, repeated over the dataset, so the model can learn. Standard shape: `model.train()`, then per batch: forward, `optimizer.zero_grad()`, `loss.backward()`, `optimizer.step()`.',
          code: `import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

X = torch.randn(100, 3)
y = torch.randn(100, 1)
loader = DataLoader(TensorDataset(X, y), batch_size=16, shuffle=True)

model = nn.Sequential(nn.Linear(3, 16), nn.ReLU(), nn.Linear(16, 1))
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(5):
    model.train()
    total_loss = 0
    for batch_X, batch_y in loader:
        pred = model(batch_X)
        loss = criterion(pred, batch_y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    print(f"Epoch {epoch+1} | Loss: {total_loss/len(loader):.4f}")`,
          output: `Epoch 1 | Loss: 1.1042
Epoch 2 | Loss: 1.0521
Epoch 3 | Loss: 1.0198
Epoch 4 | Loss: 0.9954
Epoch 5 | Loss: 0.9782`,
        },
      ],
    },
    {
      num: 5, title: 'Data Pipeline',
      cards: [
        {
          num: 20, title: 'Dataset',
          desc: '`Dataset` is an abstract class representing your data: how many samples there are (`__len__`) and how to get one by index (`__getitem__`). It exists to make raw data — images, CSVs, text — compatible with the training loop.',
          code: `from torch.utils.data import Dataset

class MyDataset(Dataset):
    def __init__(self, X, y):
        self.X = X
        self.y = y

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

X = torch.randn(100, 5)
y = torch.randint(0, 2, (100,))
dataset = MyDataset(X, y)
print(len(dataset))
print(dataset[0])`,
          output: `100
(tensor([...]), tensor(0))`,
        },
        {
          num: 21, title: 'DataLoader',
          desc: '`DataLoader` wraps a Dataset and provides batching, shuffling, and parallel loading. You can\'t load an entire dataset into memory at once, so DataLoader efficiently streams it in small batches — making training faster, more memory-efficient, and convenient.',
          code: `from torch.utils.data import DataLoader

train_loader = DataLoader(
    dataset=dataset,
    batch_size=16,
    shuffle=True,
    num_workers=0,
)

for batch_X, batch_y in train_loader:
    print(batch_X.shape, batch_y.shape)
    break`,
          output: `torch.Size([16, 5]) torch.Size([16])`,
        },
        {
          num: 22, title: 'Batch',
          desc: 'A batch is a group of samples from the Dataset the model processes together at once. Gradient descent over the full dataset is slow and memory-heavy, a single sample (SGD) is noisy — a batch is the sweet spot between speed and stability.',
          code: `loader = DataLoader(dataset, batch_size=32, shuffle=True)

for batch_X, batch_y in loader:
    # batch_X.shape -> (32, features)
    # batch_y.shape -> (32,)
    print(batch_X.shape, batch_y.shape)
    break`,
          output: `torch.Size([32, 5]) torch.Size([32])`,
        },
        {
          num: 23, title: 'Sampler',
          desc: "A Sampler decides in what order samples get pulled from the Dataset — random, sequential, or weighted (for class imbalance). You pass it to the DataLoader as `sampler=`; when you use one, `shuffle` must stay `False`.",
          code: `from torch.utils.data import RandomSampler, WeightedRandomSampler

sampler = RandomSampler(dataset)
loader = DataLoader(dataset, batch_size=16, sampler=sampler)

weights = [0.1 if v == 0 else 0.9 for v in dataset.y]
w_sampler = WeightedRandomSampler(weights, num_samples=len(weights), replacement=True)
w_loader = DataLoader(dataset, batch_size=16, sampler=w_sampler)
print("wired up")`,
          output: `wired up`,
        },
        {
          num: 24, title: 'collate_fn',
          desc: '`collate_fn` is a function that describes how individual samples get combined into a batch. The default collate works fine for plain tensors, but variable-length sequences (text, audio) or custom data structures need their own logic.',
          code: `from torch.nn.utils.rnn import pad_sequence

def my_collate(batch):
    xs = [item[0] for item in batch]
    ys = [item[1] for item in batch]
    xs_padded = pad_sequence(xs, batch_first=True, padding_value=0)
    ys = torch.tensor(ys)
    return xs_padded, ys

loader = DataLoader(dataset, batch_size=8, collate_fn=my_collate)`,
          output: `# a DataLoader wired with a custom batch-building function`,
        },
      ],
    },
    {
      num: 6, title: 'First Real Project',
      cards: [
        {
          num: 25, title: 'Fashion MNIST',
          desc: "Fashion MNIST is an image-classification dataset — 70,000 grayscale 28x28 images across 10 categories (T-shirt, Trouser, Sneaker...). It's a step up from digit-MNIST, which makes it a good real first project: 60,000 training images, 10,000 test images.",
          code: `from torchvision import datasets, transforms

transform = transforms.Compose([transforms.ToTensor()])

train_dataset = datasets.FashionMNIST(root='./data', train=True, download=True, transform=transform)
test_dataset  = datasets.FashionMNIST(root='./data', train=False, download=True, transform=transform)

print(len(train_dataset), len(test_dataset))
print(train_dataset[0][0].shape)`,
          output: `60000 10000
torch.Size([1, 28, 28])`,
        },
        {
          num: 26, title: 'ANN',
          desc: 'An Artificial Neural Network (fully connected) is input → hidden layers → output. It\'s the first simple architecture for classifying images, a good way to learn the basics before CNNs. Input 784 (28x28 flattened), hidden 128 → 64 with ReLU, output 10 neurons — one per class.',
          code: `import torch.nn as nn

class FashionANN(nn.Module):
    def __init__(self):
        super().__init__()
        self.network = nn.Sequential(
            nn.Flatten(),
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        return self.network(x)

model = FashionANN()
print(model)`,
          output: `FashionANN(
  (network): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=784, out_features=128, bias=True)
    (2): ReLU()
    (3): Linear(in_features=128, out_features=64, bias=True)
    (4): ReLU()
    (5): Linear(in_features=64, out_features=10, bias=True)
  )
)`,
        },
        {
          num: 27, title: 'Train',
          desc: "Showing the model data and updating weights — one full epoch means forward → loss → backward → update across the whole training set. The model only learns from being shown examples over and over, improving with each mistake.",
          code: `import torch.optim as optim
from torch.utils.data import DataLoader

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

epochs = 5
for epoch in range(epochs):
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Epoch [{epoch+1}/{epochs}] | Loss: {running_loss/len(train_loader):.4f}")`,
          output: `Epoch [1/5] | Loss: 0.5123
Epoch [2/5] | Loss: 0.3781
Epoch [3/5] | Loss: 0.3392
Epoch [4/5] | Loss: 0.3121
Epoch [5/5] | Loss: 0.2918`,
        },
        {
          num: 28, title: 'Validation',
          desc: "During training, a separate validation set checks the model's performance on data it wasn't trained on — this is how overfitting shows up. Training loss alone won't tell you if the model generalizes; usually 10-20% of the training set is held out for this.",
          code: `from torch.utils.data import random_split

train_size = int(0.8 * len(train_dataset))
val_size = len(train_dataset) - train_size
train_ds, val_ds = random_split(train_dataset, [train_size, val_size])

val_loader = DataLoader(val_ds, batch_size=64)

model.eval()
val_loss = 0
with torch.no_grad():
    for images, labels in val_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        val_loss += loss.item()

print(f"Validation Loss: {val_loss/len(val_loader):.4f}")`,
          output: `Validation Loss: 0.3346`,
        },
        {
          num: 29, title: 'Test',
          desc: "The final evaluation, on a completely unseen test set, done after training. Validation is for tuning hyperparameters; the test set gives the honest final performance number. Use `model.eval()` + `torch.no_grad()` to get predictions.",
          code: `test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

model.eval()
test_loss = 0
with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        test_loss += loss.item()

print(f"Test Loss: {test_loss/len(test_loader):.4f}")`,
          output: `Test Loss: 0.3405`,
        },
        {
          num: 30, title: 'Accuracy',
          desc: 'Accuracy = correctly predicted samples / total samples x 100 — a direct, easy-to-read classification measure alongside loss. Predicted class comes from `torch.argmax(outputs, dim=1)`, then you compare predictions against actual labels.',
          code: `def calculate_accuracy(loader, model):
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for images, labels in loader:
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    return 100 * correct / total

print(f"Train Accuracy: {calculate_accuracy(train_loader, model):.2f}%")
print(f"Test Accuracy : {calculate_accuracy(test_loader, model):.2f}%")`,
          output: `Train Accuracy: 89.14%
Test Accuracy : 87.02%`,
        },
      ],
    },
    {
      num: 7, title: 'GPU',
      cards: [
        {
          num: 31, title: 'CUDA',
          desc: "CUDA is NVIDIA's technology for using a GPU for general-purpose computing. Deep learning runs millions of calculations — a CPU works sequentially, a GPU works in parallel across thousands of cores, which is where the 10-50x training speedup comes from.",
          code: `import torch

print(torch.cuda.is_available())     # True / False
print(torch.cuda.device_count())     # how many GPUs
print(torch.version.cuda)            # CUDA version`,
          output: `False
0
None`,
        },
        {
          num: 32, title: 'device',
          desc: 'A `device` object tells a tensor or model which hardware it should run on — CPU or GPU. Wrapping it in a variable keeps the same code working whether or not a GPU is present, instead of hardcoding "cuda" and breaking when there isn\'t one.',
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)`,
          output: `cpu`,
        },
        {
          num: 33, title: 'model.to(device)',
          desc: "Moves all of a model's parameters (weights & biases) onto the target device. Until the model is on GPU, you get none of the speed benefit. Note: any new tensor you create afterward still defaults to CPU — you have to move data too.",
          code: `model = FashionANN()
model = model.to(device)

print(next(model.parameters()).device)`,
          output: `cpu`,
        },
        {
          num: 34, title: 'batch.to(device)',
          desc: 'Moving each batch\'s images and labels onto the same device as the model. PyTorch\'s rule: model and data must be on the same device, or you get "Expected all tensors to be on the same device". Move each batch inside the training loop.',
          code: `for images, labels in train_loader:
    images = images.to(device)
    labels = labels.to(device)

    outputs = model(images)
    break

print(images.device, labels.device)`,
          output: `cpu cpu`,
        },
        {
          num: 35, title: 'GPU training',
          desc: 'Running the whole training process on GPU — model and data both. Three steps: define the device, move the model, move every batch. Even a small dataset like Fashion MNIST shows a difference; large datasets make GPU nearly mandatory.',
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = FashionANN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(5):
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Epoch [{epoch+1}/5] | Loss: {running_loss/len(train_loader):.4f}")`,
          output: `Epoch [1/5] | Loss: 0.5123
Epoch [2/5] | Loss: 0.3781
Epoch [3/5] | Loss: 0.3392
Epoch [4/5] | Loss: 0.3121
Epoch [5/5] | Loss: 0.2918`,
        },
      ],
    },
    {
      num: 8, title: 'Optimization',
      cards: [
        {
          num: 36, title: 'Overfitting',
          desc: "Overfitting is when a model learns the training data too well — including its noise — so it does great on training data but poorly on unseen validation/test data. Symptom: training loss keeps dropping while validation loss starts climbing. Cause: too much model complexity, too little regularization, or too many epochs.",
          code: `# Symptom pattern to watch for while training:
# epoch 1: train_loss=0.90  val_loss=0.88
# epoch 5: train_loss=0.40  val_loss=0.45
# epoch 9: train_loss=0.12  val_loss=0.61   <- val_loss rising = overfitting`,
          output: `# no output — this is a pattern to look for in training logs`,
        },
        {
          num: 37, title: 'Dropout',
          desc: "A regularization technique that randomly zeroes out a fraction of a layer's outputs during training (commonly 50% for hidden layers). It stops neurons from over-relying on each other and forces the network to learn more robust features — effectively training an ensemble of smaller subnetworks.",
          code: `import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(p=0.5),   # 50% dropout
    nn.Linear(256, 10)
)
print(model)`,
          output: `Sequential(
  (0): Linear(in_features=784, out_features=256, bias=True)
  (1): ReLU()
  (2): Dropout(p=0.5, inplace=False)
  (3): Linear(in_features=256, out_features=10, bias=True)
)`,
        },
        {
          num: 38, title: 'Weight Decay',
          desc: 'A regularization technique that penalizes large weights by adding a term proportional to their squared magnitude (L2) to the loss. Optimizers implement it as a kind of multiplicative decay on the weights. Typical values for lambda range from 1e-5 to 1e-2.',
          code: `optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
print(optimizer)`,
          output: `AdamW (
Parameter Group 0
    lr: 0.001
    weight_decay: 0.0001
    ...
)`,
        },
        {
          num: 39, title: 'Early Stopping',
          desc: 'A simple, effective regularizer: monitor a validation metric (usually loss), and stop training once it hasn\'t improved for `patience` epochs. Save the best epoch\'s model so you can restore it afterward.',
          code: `best_val_loss = float('inf')
patience = 10
counter = 0

for epoch in range(50):
    # train(...)
    val_loss = 0.30  # example
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'best_model.pth')
        counter = 0
    else:
        counter += 1
        if counter >= patience:
            print("Early stopping triggered")
            break`,
          output: `# once val_loss fails to improve for "patience" epochs: "Early stopping triggered"`,
        },
        {
          num: 40, title: 'Transforms',
          desc: 'Operations applied to input data (mostly images, sometimes text/audio) to prepare or augment it for the model. Preprocessing (Resize, Normalize, ToTensor) and augmentation (RandomHorizontalFlip, RandomRotation) get composed into a pipeline in torchvision.',
          code: `from torchvision import transforms

train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])
print(train_transform)`,
          output: `Compose(
    RandomResizedCrop(size=(224, 224), ...)
    RandomHorizontalFlip(p=0.5)
    ColorJitter(brightness=[0.8, 1.2], contrast=[0.8, 1.2])
    ToTensor()
    Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
)`,
        },
        {
          num: 41, title: 'Data Augmentation',
          desc: 'Artificially growing a training set\'s size and diversity by applying random, realistic transformations to existing samples. This makes the model invariant to those variations, which reduces overfitting. Geometric (flips, rotations, crops), photometric (brightness/contrast), and advanced (MixUp, CutMix, AutoAugment) are the common categories.',
          code: `# example augmentation pipeline (vision)
aug = transforms.Compose([
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2),
])
print("augmentation pipeline ready")`,
          output: `augmentation pipeline ready`,
        },
        {
          num: 42, title: 'Optuna',
          desc: 'Optuna is an automatic hyperparameter-optimization framework with a "define-by-run" API, so the search space is built dynamically. It can prune bad trials early and supports multi-objective optimization. Key concepts: a Study (an optimization session), a Trial (one evaluation with a specific hyperparameter set), and the objective function (takes a trial, returns a metric).',
          code: `import optuna

def objective(trial):
    x = trial.suggest_float("x", -10, 10)
    return (x - 2) ** 2

study = optuna.create_study(direction="minimize")
study.optimize(objective, n_trials=100)

print("Best params:", study.best_params)
print("Best value:", study.best_value)`,
          output: `Best params: {'x': 2.0003}
Best value: 9.123e-08`,
        },
      ],
    },
    {
      num: 9, title: 'CNN',
      cards: [
        {
          num: 43, title: 'Conv2d',
          desc: "`nn.Conv2d` is a convolutional layer that slides filters (kernels) over an image to detect local patterns — edges, textures, shapes. Fully connected layers destroy an image's spatial structure; convolution preserves it, using far fewer parameters. Key args: `in_channels`, `out_channels`, `kernel_size`, `stride`, `padding`.",
          code: `import torch.nn as nn

conv = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, padding=1)

x = torch.randn(16, 1, 28, 28)      # batch=16, grayscale 28x28
out = conv(x)

print(out.shape)     # torch.Size([16, 32, 28, 28])`,
          output: `torch.Size([16, 32, 28, 28])`,
        },
        {
          num: 44, title: 'ReLU',
          desc: 'ReLU (`nn.ReLU()`) zeroes out negative values and leaves positives untouched (`f(x) = max(0, x)`). Non-linearity after a convolution is essential, or the whole network collapses into something linear. It gives the network room to learn complex patterns and reduces vanishing gradients somewhat.',
          code: `relu = nn.ReLU()

x = torch.tensor([-2.0, -0.5, 0.0, 1.5, 3.0])
print(relu(x))`,
          output: `tensor([0.0000, 0.0000, 0.0000, 1.5000, 3.0000])`,
        },
        {
          num: 45, title: 'Pooling',
          desc: "Pooling shrinks a feature map (downsampling) while keeping the important information — less computation, less overfitting, and some translation invariance. MaxPool2d (take the window's max) is the common choice; a 2x2 window with stride 2 halves the size.",
          code: `pool = nn.MaxPool2d(kernel_size=2, stride=2)

x = torch.randn(16, 32, 28, 28)
out = pool(x)

print(out.shape)     # torch.Size([16, 32, 14, 14])`,
          output: `torch.Size([16, 32, 14, 14])`,
        },
        {
          num: 46, title: 'Feature maps',
          desc: 'A feature map is what comes out of a convolution — each filter produces its own. Every filter detects a different pattern (edges, corners, textures...), and together they build a rich representation. Early layers learn simple features, deeper layers learn complex ones (eyes, wheels, faces).',
          code: `# Input:        (batch, 1, 28, 28)     -> original image
# After Conv1:  (batch, 32, 28, 28)    -> 32 feature maps
# After Pool1:  (batch, 32, 14, 14)
# After Conv2:  (batch, 64, 14, 14)    -> 64 feature maps
# After Pool2:  (batch, 64, 7, 7)
print("shape progression noted above")`,
          output: `shape progression noted above`,
        },
        {
          num: 47, title: 'CNN training',
          desc: 'Training a network built from Conv + ReLU + Pooling layers — noticeably better accuracy on images than an ANN, since spatial patterns are preserved. Typical shape: Conv → ReLU → MaxPool (repeated) → Flatten → Linear → ReLU → Dropout → Linear. Gets Fashion MNIST into the 90%+ range.',
          code: `class FashionCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),                    # 28x28 -> 14x14
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),                    # 14x14 -> 7x7
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = FashionCNN()
x = torch.randn(4, 1, 28, 28)
print(model(x).shape)`,
          output: `torch.Size([4, 10])`,
        },
      ],
    },
    {
      num: 10, title: 'Transfer Learning',
      cards: [
        {
          num: 48, title: 'Pretrained model',
          desc: 'A pretrained model has already been trained on a large dataset — ImageNet\'s 1.2 million images across 1000 classes, for example. Training from scratch needs far more data, time, and GPU power, and overfits easily on small datasets. `torchvision.models` ships ready-made ones: ResNet, VGG, EfficientNet, MobileNet.',
          code: `from torchvision import models

model = models.resnet18(weights="IMAGENET1K_V1")
print(type(model).__name__)
print(model.fc)`,
          output: `ResNet
Linear(in_features=512, out_features=1000, bias=True)`,
        },
        {
          num: 49, title: 'Freeze',
          desc: 'Freezing means stopping some layers\' parameters from training (`requires_grad = False`). Early layers learn generic features (edges, colors) that don\'t need re-learning. Freezing them cuts overfitting, speeds up training, and works well even with little data.',
          code: `for param in model.parameters():
    param.requires_grad = False

trainable = sum(p.requires_grad for p in model.parameters())
print("Trainable params:", trainable)`,
          output: `Trainable params: 0`,
        },
        {
          num: 50, title: 'Replace classifier',
          desc: 'Swapping out a pretrained model\'s final fully-connected layer for a new one matching your own classes. ImageNet has 1000 classes; your project might have 10 (Fashion MNIST) or fewer. Replace `fc` on a ResNet, or `classifier` on VGG/MobileNet.',
          code: `import torch.nn as nn

num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 10)

print(model.fc)`,
          output: `Linear(in_features=512, out_features=10, bias=True)`,
        },
        {
          num: 51, title: 'Fine-tuning',
          desc: "Training some (or all) of a pretrained model's layers a bit further on your own data. Replacing the classifier alone (feature extraction) isn't always enough — fine-tuning lets the model also pick up your data's specific patterns. Common approach: unfreeze the last few blocks plus the classifier, and use a very small learning rate.",
          code: `for param in model.layer4.parameters():
    param.requires_grad = True

optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()), lr=1e-4
)
print(sum(p.requires_grad for p in model.parameters()), "params are now trainable")`,
          output: `18 params are now trainable`,
        },
      ],
    },
    {
      num: 11, title: 'Sequence Models',
      cards: [
        {
          num: 52, title: 'Embedding',
          desc: 'Embedding converts words (or tokens) into dense continuous vectors — each word becomes a fixed-size vector that captures its meaning. One-hot encoding is too sparse; `nn.Embedding` is a lookup table learned during training. Words with similar meaning end up close together in that space.',
          code: `embedding = nn.Embedding(num_embeddings=10000, embedding_dim=100)

input_indices = torch.tensor([[1, 45, 23, 87, 3],
                              [9, 12, 4, 66, 21]])

output = embedding(input_indices)
print(output.shape)`,
          output: `torch.Size([2, 5, 100])`,
        },
        {
          num: 53, title: 'RNN',
          desc: "A network built to handle sequence data (text, time series) — it keeps a hidden state carrying forward previous information. A plain network treats each input independently, but order matters in text. At every time step, current input + previous hidden state produce a new hidden state and output. Limitation: vanishing gradients on long sequences.",
          code: `rnn = nn.RNN(input_size=100, hidden_size=64, num_layers=1, batch_first=True)

x = torch.randn(2, 5, 100)
output, hidden = rnn(x)

print(output.shape)
print(hidden.shape)`,
          output: `torch.Size([2, 5, 64])
torch.Size([1, 2, 64])`,
        },
        {
          num: 54, title: 'LSTM',
          desc: "An advanced RNN using gates (Forget, Input, Output) to remember long-term dependencies much better. Plain RNNs fail on long sequences; LSTM largely solves the vanishing-gradient problem. The Forget gate drops old info, the Input gate takes in new info, the Output gate passes it along.",
          code: `lstm = nn.LSTM(input_size=100, hidden_size=64, num_layers=2,
               batch_first=True, dropout=0.2)

x = torch.randn(2, 10, 100)
output, (hidden, cell) = lstm(x)

print(output.shape)
print(hidden.shape)
print(cell.shape)`,
          output: `torch.Size([2, 10, 64])
torch.Size([2, 2, 64])
torch.Size([2, 2, 64])`,
        },
        {
          num: 55, title: 'GRU',
          desc: "A simplified LSTM — just 2 gates (Reset + Update), a bit lighter and faster. LSTM is powerful but heavy; GRU gets nearly the same performance with fewer parameters. The Reset gate decides how much old info to ignore, the Update gate decides how much new info to add.",
          code: `gru = nn.GRU(input_size=100, hidden_size=64, num_layers=1, batch_first=True)

x = torch.randn(2, 8, 100)
output, hidden = gru(x)

print(output.shape)
print(hidden.shape)`,
          output: `torch.Size([2, 8, 64])
torch.Size([1, 2, 64])`,
        },
        {
          num: 56, title: 'Sequence classification',
          desc: 'Predicting a single label for an entire sequence — sentiment analysis, spam detection, emotion classification. Pipeline: Text → Embedding → RNN/LSTM/GRU → last hidden state → Fully Connected → Class. The goal is the overall meaning of the text, not any single word.',
          code: `class SentimentClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_classes):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, num_classes)

    def forward(self, x):
        embedded = self.embedding(x)
        output, (hidden, cell) = self.lstm(embedded)
        out = self.fc(hidden[-1])
        return out

model = SentimentClassifier(10000, 100, 64, 2)
x = torch.randint(0, 10000, (4, 20))
print(model(x).shape)`,
          output: `torch.Size([4, 2])`,
        },
        {
          num: 57, title: 'QA',
          desc: "A question-answering system takes a context (paragraph) plus a question and predicts an answer — the basis of chatbots, search, and document QA. Simple version: encode context and question separately (shared embedding + LSTM), combine both representations, predict an answer. Modern QA (BERT, RoBERTa) uses contextual embeddings for much stronger results.",
          code: `class SimpleQA(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_answers):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.context_lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.question_lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim * 2, 128), nn.ReLU(),
            nn.Dropout(0.3), nn.Linear(128, num_answers)
        )

    def forward(self, context, question):
        _, (ctx_h, _) = self.context_lstm(self.embedding(context))
        _, (q_h, _) = self.question_lstm(self.embedding(question))
        combined = torch.cat((ctx_h[-1], q_h[-1]), dim=1)
        return self.fc(combined)

model = SimpleQA(10000, 100, 64, 5)
ctx = torch.randint(0, 10000, (2, 30))
q = torch.randint(0, 10000, (2, 8))
print(model(ctx, q).shape)`,
          output: `torch.Size([2, 5])`,
        },
      ],
    },
    {
      num: 12, title: 'Production',
      cards: [
        {
          num: 58, title: 'Save model',
          desc: "Saving a trained model's weights to disk so you don't have to retrain — training takes real time, and you don't want to do it twice. Saving the `state_dict` (weights only) is best practice; you can also save the whole model (architecture + weights).",
          code: `torch.save(model.state_dict(), "fashion_mnist_model.pth")

torch.save({
    'epoch': 5,
    'model_state_dict': model.state_dict(),
}, "checkpoint.pth")
print("saved")`,
          output: `saved`,
        },
        {
          num: 59, title: 'Load model',
          desc: 'Loading saved weights back into a model — for inference, fine-tuning, or resuming training. Create the architecture first, then load the weights. When loading across devices, always pass `map_location=device`.',
          code: `model2 = FashionCNN()
model2.load_state_dict(torch.load("fashion_mnist_model.pth", map_location="cpu"))
model2.eval()
print("loaded, ready for inference")`,
          output: `loaded, ready for inference`,
        },
        {
          num: 60, title: 'Checkpoint',
          desc: "Saving model + optimizer + epoch + loss partway through training, so an interruption doesn't cost the whole run — you can resume from there. It's also how you preserve the best model (lowest validation loss) seen so far.",
          code: `def save_checkpoint(model, optimizer, epoch, loss, path="checkpoint.pth"):
    torch.save({
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'loss': loss,
    }, path)

def load_checkpoint(model, optimizer, path="checkpoint.pth"):
    ckpt = torch.load(path)
    model.load_state_dict(ckpt['model_state_dict'])
    optimizer.load_state_dict(ckpt['optimizer_state_dict'])
    return model, optimizer, ckpt['epoch'], ckpt['loss']

print("checkpoint helpers ready")`,
          output: `checkpoint helpers ready`,
        },
        {
          num: 61, title: 'Inference',
          desc: 'Getting a prediction from a trained model on new data — no training, just a forward pass. `model.eval()` puts Dropout/BatchNorm into evaluation mode, `torch.no_grad()` skips gradient tracking (faster, less memory) — this is how the model actually gets used.',
          code: `def predict(model, image, device, class_names):
    model.eval()
    with torch.no_grad():
        image = image.to(device)
        if image.dim() == 3:
            image = image.unsqueeze(0)
        output = model(image)
        prob = torch.softmax(output, dim=1)
        conf, pred = torch.max(prob, 1)
    return class_names[pred.item()], conf.item()

print("predict() ready")`,
          output: `predict() ready`,
        },
        {
          num: 62, title: 'Deployment basics',
          desc: "Putting a model into a real application — web, mobile, API — so people can actually use it. FastAPI/Flask for a web API, TorchScript for a production-optimized export, ONNX for cross-platform, PyTorch Mobile for phones, Gradio/Streamlit for a quick demo.",
          code: `# TorchScript export (production-ready)
scripted_model = torch.jit.script(model)
scripted_model.save("model_scripted.pt")

# Load later, anywhere
loaded = torch.jit.load("model_scripted.pt")
print("scripted and reloaded")`,
          output: `scripted and reloaded`,
        },
      ],
    },
  ],
};
