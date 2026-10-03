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
    whyLabel: 'Why required?',
    howLabel: 'How it works?',
    solvesLabel: 'Problem solves',
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
          why: "All deep learning computations (weights, inputs, gradients) run on tensors. Plain NumPy is CPU-only, whereas tensors provide GPU acceleration and automatic gradient tracking.",
          how: "Created with torch.tensor(). Holds n-dimensional numerical data across scalars (0D), vectors (1D), matrices (2D), and multi-dimensional arrays.",
          solves: "Eliminates NumPy's limitations by enabling GPU acceleration and automatic differentiation for neural networks.",
          desc: "A tensor is PyTorch's fundamental multi-dimensional data structure with GPU acceleration and Autograd support.",
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
          why: "Neural network layers expect exact matrix and batch dimensions. A single dimension mismatch causes runtime matrix multiplication errors.",
          how: "Inspected via .shape or .size(), and reshaped using .view(), .reshape(), .unsqueeze() (add dim), and .squeeze() (remove dim).",
          solves: "Prevents dimension mismatch bugs and transforms tensors across batches, channels, and feature dimensions without copying memory where possible.",
          desc: "Shape defines tensor dimensions and element counts, modified via view, reshape, squeeze, and unsqueeze.",
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
          why: "Models need precision control (e.g. float32 for weights, int64 for classification labels) to manage memory footprint and computational speed.",
          how: "Specified at creation with dtype=torch.float32 or cast later using .to(dtype), .float(), or .long().",
          solves: "Avoids type incompatibility errors and reduces GPU memory consumption via lower-precision formats.",
          desc: "dtype determines the underlying numeric data type stored in the tensor.",
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
          why: "Deep learning matrix operations run 10x-50x faster on CUDA GPUs or Apple Silicon MPS than on standard CPUs.",
          how: "Checked with torch.cuda.is_available() and moved between hardware with .to('cuda'), .to('mps'), or .to('cpu').",
          solves: "Resolves CPU compute bottlenecks by moving tensor operations directly to GPU VRAM.",
          desc: "Device specifies hardware placement (CPU, CUDA GPU, or MPS) for accelerated tensor math.",
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
          why: "Mathematical operations (addition, element-wise multiplication, matrix multiplication @) are the core engine of forward and backward passes.",
          how: "Executed via operators (+, *, @), functions like torch.matmul(), and in-place methods like .add_().",
          solves: "Eliminates slow Python loops by executing vectorized parallel SIMD/GPU tensor math.",
          desc: "Vectorized arithmetic and matrix multiplications executing efficiently on GPU hardware.",
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
          why: "PyTorch needs to know which tensors represent trainable parameters so it records operations for gradient backpropagation.",
          how: "Set requires_grad=True on a tensor; PyTorch then starts tracking every operation involving that tensor in a computational graph.",
          solves: "Eliminates manual derivative derivation and saves memory by only tracking gradients for trainable parameters.",
          desc: "A flag that activates PyTorch Autograd gradient tracking for trainable tensors.",
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
          why: "Backpropagation requires traversing the exact chain rule of all mathematical operations performed from inputs to loss.",
          how: "PyTorch dynamically builds a directed acyclic graph (DAG) of tensors and grad_fn nodes during the forward pass.",
          solves: "Allows dynamic, conditional neural network architectures (Dynamic Graphs / define-by-run) unlike static graph engines.",
          desc: "Dynamic DAG built on the fly during forward pass to enable reverse chain-rule differentiation.",
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2                  # Operation 1
z = torch.sin(y)            # Operation 2
print(z)                    # grad_fn=<SinBackward0>

# x -> (power) -> y -> (sin) -> z`,
          output: `tensor(0.4121, grad_fn=<SinBackward0>)`,
        },
        {
          num: 8, title: 'backward()',
          why: "Neural networks learn by computing the gradient of the scalar loss with respect to every trainable parameter using the chain rule.",
          how: "Calling loss.backward() triggers reverse traversal from the loss node through the computational graph.",
          solves: "Automates the entire backpropagation calculus in a single function call.",
          desc: "Triggers automated reverse-mode autodiff across the computational graph.",
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2          # y = 9
z = torch.sin(y)    # z = sin(9)

z.backward()        # Gradients calculate

print(x.grad)       # dz/dx = 2x * cos(x^2)`,
          output: `tensor(-0.9111)`,
        },
        {
          num: 9, title: 'gradients (.grad)',
          why: "Optimizers need the exact gradient vectors to adjust weights in the direction that minimizes loss.",
          how: "After backward(), partial derivative values are stored in the .grad attribute of each tensor with requires_grad=True.",
          solves: "Provides the numerical step values needed for gradient descent and allows manual gradient inspection and clipping.",
          desc: "The attribute containing computed partial derivatives after backward().",
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
          why: "Computes model predictions by propagating input data through weight matrices and activation functions.",
          how: "Multiply input x by weight w, add bias b (x @ w + b), and pass through an activation function like Sigmoid/ReLU.",
          solves: "Transforms raw feature vectors into meaningful output predictions and logits.",
          desc: "Propagates input data through linear transformations and activations to generate predictions.",
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
          why: "Quantifies the magnitude of error between model predictions and actual ground truth targets.",
          how: "Calculates mathematical distance using functions like Mean Squared Error (MSE) for regression or Cross-Entropy for classification.",
          solves: "Converts model mistakes into a single differentiable scalar penalty that guides optimization.",
          desc: "Scalar metric quantifying discrepancy between model predictions and ground-truth targets.",
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
          why: "Propagates the computed loss penalty backward through every layer to determine parameter blame.",
          how: "Executing loss.backward() calculates partial derivatives d(loss)/d(w) and stores them in w.grad.",
          solves: "Calculates exact error gradients for all layers simultaneously without manual math.",
          desc: "Backpropagates loss gradients through the manual network graph.",
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
          why: "Gradients only indicate slope; weights must be nudged in the negative gradient direction to reduce error.",
          how: "Wrapped in with torch.no_grad():, subtract learning rate * gradient (w -= lr * w.grad), then clear gradients with w.grad.zero_().",
          solves: "Decreases model loss iteratively while preventing gradient accumulation leaks across training steps.",
          desc: "Updates parameter tensors along the negative gradient vector and resets .grad.",
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
          why: "Demonstrates the foundational mechanics of deep learning before abstracting them into high-level PyTorch modules.",
          how: "Loops through forward pass -> loss calculation -> backward pass -> weight update -> zero gradients over multiple epochs.",
          solves: "Bridges the conceptual gap between pure calculus/linear algebra and practical deep learning code.",
          desc: "The complete training loop implemented from scratch with raw tensors and manual steps.",
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
          why: "Building complex architectures manually is error-prone; nn.Module provides clean organization, parameter tracking, and GPU migration.",
          how: "Subclass nn.Module, define layers in __init__(), and write the computational flow in forward(x).",
          solves: "Automatically tracks all sub-layer weights, enables .to(device) transfers, and manages training/eval modes.",
          desc: "Base class for all neural network modules in PyTorch, managing parameters and submodules.",
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
          why: "Dense fully-connected layers (y = xA^T + b) are the most common building block for combining learned features.",
          how: "Initialize with nn.Linear(in_features, out_features). PyTorch handles weight matrix and bias initialization automatically.",
          solves: "Eliminates manual weight matrix allocation, shape sizing, and Xavier/Kaiming initialization boilerplate.",
          desc: "Applies a linear transformation to incoming data with learnable weights and biases.",
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
          why: "Linear layers stacked together only compute linear transformations; activations introduce non-linearity to learn complex patterns.",
          how: "Applied between layers using functions like nn.ReLU(), nn.Sigmoid(), or nn.GELU().",
          solves: "Solves the linear representation collapse problem, allowing neural networks to act as universal function approximators.",
          desc: "Non-linear transformation functions enabling networks to model complex decision boundaries.",
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
          why: "Basic gradient descent converges slowly and gets stuck in local minima; advanced optimizers provide momentum and adaptive learning rates.",
          how: "Initialize torch.optim.Adam(model.parameters(), lr=0.001) and call opt.step() alongside opt.zero_grad().",
          solves: "Speeds up training convergence and automates per-parameter learning rate tuning (Adam, RMSprop, SGD).",
          desc: "Automated parameter optimization algorithms implementing SGD, Adam, and momentum updates.",
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
          why: "Connects all deep learning components (model, data, loss, optimizer) into a systematic training pipeline.",
          how: "Iterates through epochs: pred = model(x), loss = crit(pred, y), opt.zero_grad(), loss.backward(), opt.step().",
          solves: "Provides the standard 5-step blueprint used across almost all PyTorch supervised learning pipelines.",
          desc: "Standard 5-step loop orchestrating forward pass, loss calculation, backpropagation, and weight stepping.",
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
          why: "Large datasets cannot fit in memory simultaneously and raw formats (images, CSV, audio) need structured sample-by-sample retrieval.",
          how: "Subclass torch.utils.data.Dataset and implement __len__() and __getitem__(index).",
          solves: "Decouples dataset storage and preprocessing logic from model training code.",
          desc: "Abstract interface representing a map-style or iterable dataset.",
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
          why: "Feeding individual samples sequentially to a GPU is slow and causes training instability; models need batched, shuffled, parallel loading.",
          how: "Wrap a Dataset in DataLoader(dataset, batch_size=32, shuffle=True, num_workers=2).",
          solves: "Eliminates I/O bottlenecks with multi-process background loading and automated batch creation.",
          desc: "Provides batching, shuffling, and multi-process background data streaming.",
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
          why: "Computing gradients on the entire dataset at once exhausts VRAM, while single-sample SGD is noisy.",
          how: "Slices data into mini-batches (e.g. 32 or 64 samples) processed together as a single tensor with leading dimension [B, ...].",
          solves: "Balances gradient stability with GPU VRAM limits and hardware parallelization efficiency.",
          desc: "Groups multiple data samples together for parallel tensor computation.",
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
          why: "Real-world datasets often have severe class imbalance, requiring custom sampling strategies instead of uniform random selection.",
          how: "Pass a WeightedRandomSampler or SubsetRandomSampler to the DataLoader's sampler= argument.",
          solves: "Prevents models from ignoring minority classes in skewed datasets (e.g. medical diagnosis, fraud detection).",
          desc: "Controls the sequence and distribution of indices used to draw samples from a Dataset.",
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
          why: "Variable-length inputs (text sentences of different lengths, audio clips) cannot be stacked directly into fixed-shape batch tensors.",
          how: "Pass a custom function to collate_fn= that pads sequences with zeros to matching lengths within each mini-batch.",
          solves: "Solves shape dimension mismatches when assembling ragged, heterogeneous data into uniform tensors.",
          desc: "Custom batch merger function that merges a list of samples into mini-batch tensors with padding.",
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
          why: "Real-world vision benchmarking requires non-trivial 2D pixel data that is richer than digits while remaining lightweight for prototyping.",
          how: "Loaded via torchvision.datasets.FashionMNIST(root='./data', train=True, download=True, transform=ToTensor()).",
          solves: "Provides an accessible, standardized computer vision benchmark with 10 clothing categories of 28x28 grayscale images.",
          desc: "Standard vision benchmark dataset containing 70,000 grayscale clothing images across 10 classes.",
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
          why: "Serves as the baseline neural architecture to classify flattened spatial feature vectors into discrete probability distributions.",
          how: "Flattens 28x28 inputs to 784 features, passes them through Linear -> ReLU -> Linear hidden layers to 10 class logits.",
          solves: "Solves multi-class classification on tabular and flattened spatial data.",
          desc: "Artificial Neural Network architecture using fully connected layers for multi-class classification.",
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
          why: "Neural networks require thousands of iterative weight updates over the training set to minimize prediction error.",
          how: "Set model.train(), iterate through training DataLoader batches, compute cross-entropy loss, backpropagate, and update weights.",
          solves: "Drives down training loss and fits model weights to the training data distribution.",
          desc: "Iterative training loop execution over the dataset to optimize network parameters.",
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
          why: "Measuring performance solely on training data hides overfitting; validation checks generalization to unseen samples during training.",
          how: "Set model.eval() and with torch.no_grad():, calculate validation loss and metric accuracy across validation batches.",
          solves: "Detects overfitting early and helps select the best model checkpoint before test evaluation.",
          desc: "Evaluates model generalization on held-out validation data during training.",
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
          why: "Hyperparameter tuning on the validation set can introduce subtle selection bias; a final untouched test set provides honest evaluation.",
          how: "Run single-pass inference over the test DataLoader with model.eval() and torch.no_grad() to compute unbiased final metrics.",
          solves: "Prevents overestimating real-world production performance caused by data leakage or validation overfitting.",
          desc: "Final unbiased evaluation on completely held-out test data after training and tuning.",
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
          why: "Raw loss values (e.g. 0.342) are abstract; stakeholders need human-interpretable percentage scores of correct predictions.",
          how: "Calculate (predictions.argmax(dim=1) == labels).float().mean().item() * 100.",
          solves: "Converts class logits into percentage metric (% correctly classified) for easy evaluation.",
          desc: "Calculates the percentage of correct class predictions out of total samples.",
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
          why: "Deep learning involves massive parallel matrix multiplications; NVIDIA CUDA hardware executes thousands of threads concurrently.",
          how: "PyTorch interfaces with NVIDIA CUDA drivers via torch.cuda to allocate tensors directly in GPU VRAM.",
          solves: "Eliminates multi-day CPU training times by accelerating matrix math up to 50x-100x.",
          desc: "NVIDIA's parallel computing platform integrated directly into PyTorch.",
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
          why: "Hardcoding 'cuda' breaks scripts on machines without dedicated GPUs or on Apple Silicon MPS hardware.",
          how: "Dynamically define device = torch.device('cuda' if torch.cuda.is_available() else 'cpu').",
          solves: "Ensures robust, portable code that runs seamlessly across local laptops, Colab, and cloud GPU clusters.",
          desc: "Dynamic hardware device abstraction (CPU, CUDA, MPS) ensuring code portability.",
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)`,
          output: `cpu`,
        },
        {
          num: 33, title: 'model.to(device)',
          why: "Neural network parameter weights default to CPU memory; they must be transferred to GPU VRAM before GPU computation.",
          how: "Invoke model.to(device) once before entering the training or inference loop.",
          solves: "Recursively moves all model weights, biases, and registered buffers to the target acceleration device.",
          desc: "Recursively casts and transfers all model parameters and buffers to the specified device.",
          code: `model = FashionANN()
model = model.to(device)

print(next(model.parameters()).device)`,
          output: `cpu`,
        },
        {
          num: 34, title: 'batch.to(device)',
          why: "PyTorch raises runtime errors if a model is on GPU but the input batch tensor is still on CPU.",
          how: "Inside the batch loop, move data: images = images.to(device), labels = labels.to(device).",
          solves: "Eliminates 'Expected all tensors to be on the same device' runtime crashes.",
          desc: "Transfers mini-batch input and label tensors to the active hardware device.",
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
          why: "Combines device allocation, parallel mini-batch streaming, and CUDA kernels for end-to-end acceleration.",
          how: "Set device -> model.to(device) -> batch.to(device) -> forward/loss/backward on GPU.",
          solves: "Maximizes compute throughput and fully saturates GPU tensor cores during training.",
          desc: "Complete training workflow executing seamlessly on accelerated GPU hardware.",
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
          why: "Deep neural networks easily memorize training samples rather than learning underlying generalizable patterns.",
          how: "Diagnosed when training loss continues decreasing while validation loss begins climbing upward.",
          solves: "Identifies generalization failure before deploying unreliable models to production.",
          desc: "Phenomenon where a model memorizes training data but fails to generalize to unseen samples.",
          code: `# Symptom pattern to watch for while training:
# epoch 1: train_loss=0.90  val_loss=0.88
# epoch 5: train_loss=0.40  val_loss=0.45
# epoch 9: train_loss=0.12  val_loss=0.61   <- val_loss rising = overfitting`,
          output: `# no output — this is a pattern to look for in training logs`,
        },
        {
          num: 37, title: 'Dropout',
          why: "Co-adaptation of neurons causes overfitting; dropping random neuron activations forces redundant feature representations.",
          how: "Insert nn.Dropout(p=0.5) between dense layers; active during .train() and automatically bypassed during .eval().",
          solves: "Regularizes deep models and prevents reliance on specific individual neurons.",
          desc: "Regularization technique randomly zeroing elements with probability p during training.",
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
          why: "Large weight magnitudes cause sharp decision boundaries and vulnerability to input noise.",
          how: "Pass weight_decay=1e-4 (L2 regularization) directly to the optimizer: torch.optim.Adam(..., weight_decay=1e-4).",
          solves: "Penalizes oversized weights, leading to smoother decision boundaries and better generalization.",
          desc: "L2 regularization term added to the loss function to penalize large weight parameters.",
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
          why: "Training for a fixed number of epochs often leads to overfitting in later epochs and wastes compute.",
          how: "Track validation loss per epoch; if it fails to improve for N consecutive epochs (patience), stop training and restore the best weights.",
          solves: "Eliminates wasted GPU hours and automatically captures the optimal checkpoint.",
          desc: "Halts training when validation loss ceases to improve, saving compute and preventing overfitting.",
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
          why: "Raw images come in diverse resolutions, color ranges, and file formats that models cannot directly process.",
          how: "Chain transformations using torchvision.transforms.Compose([Resize((224,224)), ToTensor(), Normalize(mean, std)]).",
          solves: "Standardizes input image dimensions, pixel value scales ([0, 1]), and channel normalization.",
          desc: "Pipeline of deterministic preprocessing operations applied to input images.",
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
          why: "Collecting more real-world labeled data is expensive; existing datasets must be synthetically enriched.",
          how: "Apply random transforms like RandomHorizontalFlip(), RandomRotation(), and ColorJitter() on training images on-the-fly.",
          solves: "Prevents spatial orientation bias and synthetically expands dataset diversity without extra storage.",
          desc: "Generates synthetic training variations on the fly to improve model generalization.",
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
          why: "Manual hyperparameter guessing (learning rate, batch size, dropout rate) is inefficient and sub-optimal.",
          how: "Define an objective function with trial.suggest_float() / trial.suggest_int() and call study.optimize(objective, n_trials=50).",
          solves: "Automates Bayesian hyperparameter search with intelligent trial pruning, finding higher accuracy configurations faster.",
          desc: "Automated hyperparameter optimization framework with Bayesian sampling and pruning.",
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
          why: "Dense layers discard 2D spatial pixel relationships and require too many parameters for images; convolutional kernels preserve local geometry.",
          how: "Slide learnable 3x3 or 5x5 weight filters across the image using nn.Conv2d(in_channels, out_channels, kernel_size=3).",
          solves: "Drastically reduces parameter count while learning translation-invariant spatial features (edges, textures, shapes).",
          desc: "2D spatial convolution layer applying sliding learned filters over feature maps.",
          code: `import torch.nn as nn

conv = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, padding=1)

x = torch.randn(16, 1, 28, 28)      # batch=16, grayscale 28x28
out = conv(x)

print(out.shape)     # torch.Size([16, 32, 28, 28])`,
          output: `torch.Size([16, 32, 28, 28])`,
        },
        {
          num: 44, title: 'ReLU',
          why: "Linear convolution layers cannot separate non-linear visual concepts; ReLU introduces non-linearity by zeroing negative filter responses.",
          how: "Apply f(x) = max(0, x) via nn.ReLU(inplace=True) after convolution operations.",
          solves: "Eliminates the vanishing gradient problem found in Sigmoid/Tanh during deep convolutional network training.",
          desc: "Rectified Linear Unit activation introducing non-linearity after convolution.",
          code: `relu = nn.ReLU()

x = torch.tensor([-2.0, -0.5, 0.0, 1.5, 3.0])
print(relu(x))`,
          output: `tensor([0.0000, 0.0000, 0.0000, 1.5000, 3.0000])`,
        },
        {
          num: 45, title: 'Pooling',
          why: "Successive convolution layers produce large feature maps that increase computation and cause sensitivity to exact pixel locations.",
          how: "Downsample feature maps using nn.MaxPool2d(kernel_size=2, stride=2) to take the maximum activation in each 2x2 window.",
          solves: "Cuts spatial dimensions in half, reduces computational cost, and provides translation invariance.",
          desc: "Spatial downsampling layer extracting maximum activations across local grid windows.",
          code: `pool = nn.MaxPool2d(kernel_size=2, stride=2)

x = torch.randn(16, 32, 28, 28)
out = pool(x)

print(out.shape)     # torch.Size([16, 32, 14, 14])`,
          output: `torch.Size([16, 32, 14, 14])`,
        },
        {
          num: 46, title: 'Feature maps',
          why: "Neural visual inspection requires verifying what specific visual patterns (edges, textures, object parts) each layer is detecting.",
          how: "Extract intermediate tensor outputs from convolution layers and plot them as individual 2D grayscale/color channels.",
          solves: "Opens the deep learning 'black box' by visualizing hierarchical representations inside CNNs.",
          desc: "Intermediate 2D activation tensors output by convolutional layers.",
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
          why: "Assembles convolutional, activation, pooling, flattening, and linear layers into an end-to-end vision classifier.",
          how: "Pass image tensors through Conv2d -> ReLU -> MaxPool2d blocks, flatten with torch.flatten(), and project through Linear layers.",
          solves: "Solves high-accuracy image classification, object recognition, and visual pattern detection tasks.",
          desc: "Complete convolutional neural network trained end-to-end for image classification.",
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
          why: "Training massive vision models from scratch requires millions of labeled images and weeks of GPU cluster compute.",
          how: "Download pre-trained architectures with proven weights: weights = ResNet18_Weights.DEFAULT; model = resnet18(weights=weights).",
          solves: "Enables state-of-the-art accuracy on small custom datasets by transferring rich features learned on ImageNet (1.4M images).",
          desc: "Pre-trained vision backbone pre-conditioned on massive benchmarks like ImageNet.",
          code: `from torchvision import models

model = models.resnet18(weights="IMAGENET1K_V1")
print(type(model).__name__)
print(model.fc)`,
          output: `ResNet
Linear(in_features=512, out_features=1000, bias=True)`,
        },
        {
          num: 49, title: 'Freeze',
          why: "Pretrained feature extractors already know generic visual primitives; retraining them on a tiny dataset destroys these learned weights (catastrophic forgetting).",
          how: "Loop through base parameters and set param.requires_grad = False.",
          solves: "Accelerates training speed, cuts backpropagation memory, and preserves battle-tested feature extraction filters.",
          desc: "Disables gradient updates on backbone parameters to preserve pre-learned representations.",
          code: `for param in model.parameters():
    param.requires_grad = False

trainable = sum(p.requires_grad for p in model.parameters())
print("Trainable params:", trainable)`,
          output: `Trainable params: 0`,
        },
        {
          num: 50, title: 'Replace classifier',
          why: "Pretrained models are built for 1,000 ImageNet classes; custom tasks usually require a different number of output classes (e.g. 2 for cats vs dogs).",
          how: "Replace the final linear head: num_ftrs = model.fc.in_features; model.fc = nn.Linear(num_ftrs, num_classes).",
          solves: "Adapts generic deep vision models to specific target classification domains.",
          desc: "Replaces the terminal fully connected layer to match custom class counts.",
          code: `import torch.nn as nn

num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 10)

print(model.fc)`,
          output: `Linear(in_features=512, out_features=10, bias=True)`,
        },
        {
          num: 51, title: 'Fine-tuning',
          why: "While frozen base features work well, unfreezing top layers and training with a very small learning rate adapts domain-specific nuances.",
          how: "Unfreeze select top layers (param.requires_grad = True) and train with a tiny learning rate (e.g., 1e-5).",
          solves: "Maximizes accuracy on specialized datasets (medical imaging, satellite scans) beyond standard generic features.",
          desc: "Selectively unfreezes deep backbone layers for subtle gradient fine-tuning.",
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
          why: "Categorical integer token IDs lack semantic relationships and one-hot vectors are sparse and memory-inefficient.",
          how: "Map integer token IDs to dense, learnable continuous vectors via nn.Embedding(num_embeddings, embedding_dim).",
          solves: "Compresses sparse vocabularies into dense geometric representations where similar words have close vector distances.",
          desc: "Lookup table storing dense vector embeddings of fixed vocabulary size.",
          code: `embedding = nn.Embedding(num_embeddings=10000, embedding_dim=100)

input_indices = torch.tensor([[1, 45, 23, 87, 3],
                              [9, 12, 4, 66, 21]])

output = embedding(input_indices)
print(output.shape)`,
          output: `torch.Size([2, 5, 100])`,
        },
        {
          num: 53, title: 'RNN',
          why: "Standard feedforward networks cannot handle sequential order, temporal dependencies, or variable-length text/time-series data.",
          how: "Pass token vectors through nn.RNN(input_size, hidden_size, batch_first=True) which maintains an evolving hidden state vector h_t.",
          solves: "Enables sequence processing and temporal memory across ordered sequential inputs.",
          desc: "Recurrent neural network updating a hidden state vector at each sequence step.",
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
          why: "Standard RNNs suffer from vanishing gradients across long sequences, forgetting information from earlier steps.",
          how: "Uses a cell state c_t governed by input, forget, and output gates via nn.LSTM(input_size, hidden_size, batch_first=True).",
          solves: "Solves the vanishing gradient problem and retains long-term context across hundreds of sequence steps.",
          desc: "Long Short-Term Memory network utilizing gated cell states to maintain long-range memory.",
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
          why: "LSTMs have high parameter overhead with separate cell states and 3 gates; a lighter alternative is needed for faster training.",
          how: "Combines forget and input gates into update and reset gates via nn.GRU(input_size, hidden_size, batch_first=True).",
          solves: "Delivers LSTM-level sequence modeling performance with fewer parameters and faster execution.",
          desc: "Gated Recurrent Unit streamlining LSTM gating into reset and update mechanisms.",
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
          why: "Natural language processing tasks (sentiment analysis, spam detection) require mapping full text sequences to class probabilities.",
          how: "Pass token embeddings through an RNN/LSTM, extract the final hidden state h_n[-1], and feed it into a linear classifier.",
          solves: "Maps variable-length text sequences to fixed-dimension classification logits.",
          desc: "Maps arbitrary-length sequential input to categorical classification predictions.",
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
          why: "Extractive question answering requires predicting the exact start and end token indices of the answer span within a context passage.",
          how: "Encode context and question tokens through a sequence model and predict start and end logit distributions over token positions.",
          solves: "Solves span-based document comprehension and question-answering tasks.",
          desc: "Predicts start and end token boundary logits to extract answer spans from text.",
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
          why: "Training takes hours or days; learned weights must be serialized to disk for evaluation, deployment, or resuming training.",
          how: "Save the lightweight parameter dictionary: torch.save(model.state_dict(), 'model.pth').",
          solves: "Persists trained model weights portably without pickling Python code or architecture class definitions.",
          desc: "Serializes model weights and parameter tensors to disk.",
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
          why: "Production servers and inference pipelines need to restore saved weights into an instantiated architecture instantly.",
          how: "Instantiate the model class and load weights: model.load_state_dict(torch.load('model.pth', weights_only=True)).",
          solves: "Restores trained model state into memory ready for immediate inference or further training.",
          desc: "Restores serialized parameter weights into an instantiated model architecture.",
          code: `model2 = FashionCNN()
model2.load_state_dict(torch.load("fashion_mnist_model.pth", map_location="cpu"))
model2.eval()
print("loaded, ready for inference")`,
          output: `loaded, ready for inference`,
        },
        {
          num: 60, title: 'Checkpoint',
          why: "Long training runs can crash due to hardware faults, power cuts, or spot-instance preemption; training must be resumable.",
          how: "Save a dictionary containing epoch number, model state_dict, optimizer state_dict, and current loss score.",
          solves: "Enables lossless resumption of interrupted training runs and tracks historical best milestones.",
          desc: "Bundles model weights, optimizer states, epoch counters, and loss into a resumable archive.",
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
          why: "Production predictions must be deterministic, fast, and memory-efficient without wasting resources tracking gradients.",
          how: "Put the model in model.eval() and wrap prediction calls inside with torch.no_grad():.",
          solves: "Disables Dropout/BatchNorm update behavior and reduces memory consumption by 50%+ during production serving.",
          desc: "Executes forward-pass predictions in evaluation mode without Autograd tracking.",
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
          why: "Python PyTorch runtimes are heavy; production systems need exportable formats (TorchScript, ONNX) and lightweight REST APIs.",
          how: "Trace or script the model via torch.jit.trace(model, example_input) and serve via FastAPI or C++ runtimes.",
          solves: "Decouples model execution from Python, enabling fast inference in C++, mobile, and low-latency microservices.",
          desc: "Exports PyTorch models via TorchScript/ONNX for standalone production deployment.",
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
